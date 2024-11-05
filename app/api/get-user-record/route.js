import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Prescription from "@/models/prescription";
import dbConnect from "@/config/dbconnect";

export async function POST(request) {
  console.log("request");

  await dbConnect();
  try {
    const { id } = await request.json();
    console.log("id", id);
    const prescriptions = await Prescription.find({ userId: id });
    if (!prescriptions) {
      return NextResponse.json(
        { error: "No prescriptions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
