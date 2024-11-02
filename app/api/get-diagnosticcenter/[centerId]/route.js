import { NextResponse } from "next/server";
import  dbConnect  from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";

export async function GET(req) {
  try {
    await dbConnect();
    
    const { centerId } = params;

    const diagnosticCenter = await DiagnosticCenter.findOne({ 
      diagnosticCenterId: centerId
    }).select({
      diagnosticCenterId: 1,
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
      _id: 0
    });

    if (!diagnosticCenter) {
      return NextResponse.json(
        { message: "Diagnostic center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(diagnosticCenter);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
  