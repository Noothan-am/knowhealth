import { NextResponse } from "next/server";
import Prescription from "../../models/prescription";
import dbConnect from "../../config/dbconnect";

export async function POST(request) {
  await dbConnect();
  const formData = await request.formData();
  const userId = formData.get("userId");
  const doctorId = formData.get("doctorId");
  const name = formData.get("name");
  const age = formData.get("age");
  const specialty = formData.get("specialty");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const image = formData.get("image");
  const description = formData.get("description");

  if (!userId || !name || !age || !phone || !email || !image) {
    return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
  }

  try {
    const newPrescription = new Prescription({
      userId,
      doctorId,
      name,
      age,
      specialty,
      phone,
      email,
      image,
      description
    });
    await newPrescription.save();
    return NextResponse.json(
      { message: "Prescription added successfully", id: newPrescription.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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
