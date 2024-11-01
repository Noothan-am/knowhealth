import { NextResponse } from "next/server";
import Prescription from "@/models/prescription";
import dbConnect from "@/config/dbconnect";
import { handleFile, uploadPrescription } from "@/app/api/prescription/index";

export async function POST(request) {
  const formData = await request.formData();
  const d = new FormData();
  d.append("file", formData.get("file"));
  const { finalUrl, success } = await handleFile(d);
  console.log(finalUrl, success);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
  // const { response } = uploadPrescription(finalUrl, formData);
  // if (!response) {
  //   return NextResponse.json(
  //     { error: "Failed to upload file" },
  //     { status: 500 }
  //   );
  // }
  return NextResponse.json(
    { message: "Prescription added successfully" },
    { status: 201 }
  );
}

export async function GET(request) {
  await dbConnect();
  try {
    const prescriptions = await Prescription.find().sort({ current: -1 });
    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
