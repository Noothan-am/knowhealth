import { z } from "zod";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "@/config/dbconnect";
import Report from "@/models/report";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const createReportSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  testId: z.string().min(1, "Test ID is required"), 
  userId: z.string().min(1, "User ID is required"),
  diagnosticCenterId: z.string().min(1, "Diagnostic Center ID is required"),
  testName: z.string().min(1, "Test name is required"),
  name: z.string().min(1, "Patient name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  phoneNumber: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
  comments: z.string().optional()
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `report-files/${fileName}`,
    Body: buffer,
    ContentType: file.type,
    ContentLength: buffer.length,
    ACL: 'public-read'
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/report-files/${fileName}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const reportFile = formData.get('reportFile');
    const reportData = JSON.parse(formData.get('data'));

    const result = createReportSchema.safeParse(reportData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    let reportFileUrl = '';
    if (reportFile) {
      const fileName = `${uuidv4()}.${reportFile.type.split('/')[1]}`;
      reportFileUrl = await uploadFileToS3(reportFile, fileName);
    } else {
      return NextResponse.json(
        { error: "Report file is required" },
        { status: 400 }
      );
    }

    const newReport = new Report({
      ...result.data,
      reportFile: reportFileUrl,
      date: new Date()
    });

    await newReport.save();

    return NextResponse.json(
      { message: "Report created successfully" },
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

