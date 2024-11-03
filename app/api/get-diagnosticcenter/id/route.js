import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { centerId } = body;

    if (!centerId) {
      return NextResponse.json(
        { error: "Center ID is required" },
        { status: 400 }
      );
    }

    const diagnosticCenter = await DiagnosticCenter.findOne({ 
      id: centerId
    }).select({
      id: 1,
      name: 1,
      email: 1,
      phoneNo: 1,
      address: 1,
      city: 1,
      state: 1,
      pincode: 1,
      rating: 1,
      tests: 1,
      packages: 1,
      certifications: 1,
      accreditations: 1,
      services: 1,
      specialities: 1,
      image: 1,
      timings: 1,
      _id: 0
    });
    if (!diagnosticCenter) {
      return NextResponse.json(
        { message: "Diagnostic center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(diagnosticCenter, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
