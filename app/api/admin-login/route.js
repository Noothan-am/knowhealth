import { NextResponse } from "next/server";
import Admin from "@/models/admin";
import dbConnect from "@/config/dbconnect";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();
  console.log("MongoDB connected");

  const formData = await request.json();
  const { name, email, password } = formData;

  console.log(name, email, password);

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return NextResponse.json(
      { error: "Admin with this email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hashedPassword });
  await admin.save();

  return NextResponse.json(
    { message: "Admin created successfully" },
    { status: 201 }
  );
}
