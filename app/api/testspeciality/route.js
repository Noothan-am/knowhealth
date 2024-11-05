import { z } from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/config/dbconnect";
import TestSpeciality from "@/models/testspeciality";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});


const addTestToSpecialitySchema = z.object({
  specialityName: z.string().min(2, "Speciality name must be at least 2 characters"),
  test: z.object({
    name: z.string().min(2, "Test name must be at least 2 characters"),
    description: z.string().min(2, "Description must be at least 2 characters")
  })
});

async function uploadImageToS3(imageFile, fileName) {
    const fileBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `diagnostic-center-images/${fileName}`,
      Body: buffer,
      ContentType: imageFile.type || 'image/jpeg',
      ContentLength: buffer.length,
      ACL: 'public-read'
    };
  
    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/diagnostic-center-images/${fileName}`;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  }

export async function GET() {
  try {
    await dbConnect();
    
    const specialities = await TestSpeciality.find({});
    
    return NextResponse.json(specialities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch specialities" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const body = JSON.parse(formData.get('data'));
    
    // Adding a test to an existing speciality
    const result = addTestToSpecialitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await dbConnect();

    const { specialityName, test } = result.data;

    // Handle image upload
    if (formData.get('image')) {
      const imageFile = formData.get('image');
      const fileName = `${uuidv4()}.${imageFile.type.split('/')[1]}`;
      const imageUrl = await uploadImageToS3(imageFile, fileName);
      test.image = imageUrl;
    }
    console.log(test);
    console.log('image');

    const updatedSpeciality = await TestSpeciality.findOneAndUpdate(
        { "specialities.name": specialityName },
        { 
          $push: { 
            "specialities.tests": test 
          }
        },
        { new: true }
      );


    if (!updatedSpeciality) {
      return NextResponse.json(
        { error: "Speciality not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Test added to speciality successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
