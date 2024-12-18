import { NextResponse } from "next/server";
import User from "@/models/users";
import dbConnect from "@/config/dbconnect";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const user = new User(body);
    await user.save();
    return NextResponse.json(
      { message: "User created successfully" },
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

export async function GET(request) {
  await dbConnect();
  try {
    const users = await User.find();
    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
