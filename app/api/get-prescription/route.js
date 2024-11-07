import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import Prescription from "@/models/prescription";

export async function POST(req) {
  const { id, who } = await req.json();
  console.log(
    "Fetching prescriptions for:",
    who !== "doctor" ? `User ${id}` : `Doctor ${id}`
  );

  try {
    await dbConnect();
    const prescriptions = await Prescription.find({
      ...(who !== "doctor" ? { userId } : { doctorId }),
    }).sort({ current: -1 });

    if (prescriptions.length === 0) {
      return NextResponse.json(
        { error: "No prescriptions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
