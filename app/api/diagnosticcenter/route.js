import bcrypt from "bcryptjs";
import { z } from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const createDiagnosticCenterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNo: z.object({
        value: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
        isVerified: z.boolean().default(false),
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    address: z.string().min(2, "Address must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5").default(0),
    certifications: z.array(z.string()).default([]),
    accreditations: z.array(z.string()).default([]),
    services: z.object({
        homeSampleCollection: z.boolean(),
        onlineReports: z.boolean(),
    }).default({ homeSampleCollection: false, onlineReports: false }),
    specialities: z.array(z.string()).default([]),
    timings: z.object({}).optional(),
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

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');
    const diagnosticCenterData = JSON.parse(formData.get('data'));

    const result = createDiagnosticCenterSchema.safeParse(diagnosticCenterData);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const {
      name,
      email,
      phoneNo,
      password,
      address,
      city,
      state,
      pincode,
      rating,
      certifications,
      accreditations,
      services,
      specialities,
      timings
    } = result.data;

    await dbConnect();

    const userExists = await DiagnosticCenter.findOne({ "phoneNo.value": phoneNo.value });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = '';
    if (imageFile) {
      const fileName = `${uuidv4()}.${imageFile.type.split('/')[1]}`;
      imageUrl = await uploadImageToS3(imageFile, fileName);
    }

    const newDiagnosticCenter = new DiagnosticCenter({
      name,
      email,
      phoneNo,
      password: hashedPassword,
      address,
      city,
      state,
      pincode,
      rating,
      certifications,
      accreditations,
      services,
      specialities,
      image: imageUrl,
      timings,
    });

    await newDiagnosticCenter.save();

    return NextResponse.json(
      { message: "Diagnostic Center created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const diagnosticCenters = await DiagnosticCenter.find({}).select({
      id: 1,
      name: 1,
      phoneNo: 1,
      address: 1,
      city: 1,
      state: 1,
      pincode: 1,
      rating: 1,
      services: 1,
      specialities: 1,
      image: 1,
      tests: {
        speciality: 1
      },
      _id: 0
    });

    if (!diagnosticCenters.length) {
      return NextResponse.json(
        { message: "No diagnostic centers found" },
        { status: 404 }
      );
    }

    return NextResponse.json(diagnosticCenters, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

    