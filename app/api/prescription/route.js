import { NextApiRequest, NextApiResponse } from "next";
import Prescription from "../../models/prescription";
import dbConnect from "@/config/dbconnect";

export async function POST(request) {
  await dbConnect();
  const formData = await request.formData();
  const name = formData.get("name");
  const age = formData.get("age");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const image = formData.get("image");
  b;
  const specialty = formData.get("specialty");

  if (!name || !age || !specialty || !phone || !email || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPrescription = new Prescription({
      name,
      age,
      specialty,
      phone,
      email,
      image,
    });
    await newPrescription.save();
    return NextResponse.json(
      { msg: "successfully prescription added" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await dbConnect();
  try {
    const prescriptions = await Prescription.find();
    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
