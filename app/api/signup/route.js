import { NextResponse } from "next/server";
import User from "@/models/users";
import Doctor from "@/models/doctors";
import dbConnect from "@/config/dbconnect";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const formData = await request.formData();
  const activeTab = formData.get("activeTab");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");

  if (!name || !email || !password || !phone) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (activeTab === "consumer") {
    try {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      await newUser.save();
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else if (activeTab === "seller") {
    const specialization = formData.get("specialization");
    const experience = formData.get("experience");
    const consultationFee = formData.get("consultationFee");

    if (!specialization || !experience || !consultationFee) {
      return NextResponse.json(
        { error: "All fields are required for sellers" },
        { status: 400 }
      );
    }

    try {
      const newDoctor = new Doctor({
        name,
        email,
        password: hashedPassword,
        speciality: specialization,
        phone,
        experience: parseInt(experience),
        consultationFee: parseInt(consultationFee),
      });

      await newDoctor.save();
      return NextResponse.json(
        { message: "Doctor created successfully" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { error: "Invalid tab selected" },
      { status: 400 }
    );
  }
}
