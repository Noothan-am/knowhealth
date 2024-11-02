import { z } from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const addPackageSchema = z.object({
  diagnosticCenterId: z.string().uuid("Invalid diagnostic center ID"),
  package: z.object({
    name: z.string().min(2, "Package name must be at least 2 characters"),
    testCount: z.number().min(1, "Test count must be at least 1"),
    price: z.number().min(0, "Price must be a positive number"),
    image: z.string().optional(),
    specialities: z.array(z.string()).default([]),
    tests: z.array(z.string()).default([]),
    description: z.string().min(2, "Description must be at least 2 characters")
  }),
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

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');
    const packageData = JSON.parse(formData.get('data'));

    const result = addPackageSchema.safeParse(packageData);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { diagnosticCenterId, package: packageInfo } = result.data;

    await dbConnect();

    const diagnosticCenter = await DiagnosticCenter.findOne({ id: diagnosticCenterId });
    if (!diagnosticCenter) {
      return NextResponse.json(
        { error: "Diagnostic Center not found" },
        { status: 404 }
      );
    }

    let imageUrl = '';
    if (imageFile) {
      const fileName = `${uuidv4()}.${imageFile.type.split('/')[1]}`;
      imageUrl = await uploadImageToS3(imageFile, fileName);
      packageInfo.image = imageUrl;
    }

    diagnosticCenter.packages.push(packageInfo);
    await diagnosticCenter.save();

    return NextResponse.json(
      { message: "Package added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
