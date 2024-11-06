import { NextResponse } from "next/server";
import User from "@/models/users";
import Doctor from "@/models/doctors";
import dbConnect from "@/config/dbconnect";
import bcrypt from "bcrypt";
import DiagnosticCenter from "@/models/diagnosticCenter";
import Admin from "@/models/admin";

export async function POST(request) {
  await dbConnect();
  console.log("MongoDB connected");

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const activeTab = formData.get("activeTab");

  if (!email || !password || !activeTab) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  let user;
  if (activeTab === "consumer") {
    user = await User.findOne({ email });
  } else if (activeTab === "doctor") {
    user = await Doctor.findOne({ email });
    console.log(user);
  } else if (activeTab === "diagnostics-admin") {
    user = await DiagnosticCenter.findOne({ email });
    console.log(user);
  } else if (activeTab === "admin") {
    user = await Admin.findOne({ email });
    console.log(user);
  } else {
    return NextResponse.json(
      { error: "Invalid tab selected" },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json(
    { user, message: "Login successful" },
    { status: 200 }
  );
}
