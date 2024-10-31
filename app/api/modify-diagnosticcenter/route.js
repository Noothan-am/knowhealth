import { z } from "zod";
import { dbConnect } from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";
import { NextResponse } from "next/server";

const modifyDiagnosticCenterSchema = z.object({
  id: z.string().min(1, "Diagnostic Center ID is required"),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNo: z.object({
    value: z.string(),
    isVerified: z.boolean()
  }).optional(),
  address: z.string().optional(),
  city: z.string().optional(), 
  state: z.string().optional(),
  pincode: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  tests: z.array(z.object({
    name: z.string(),
    price: z.number(),
    description: z.string()
  })).optional(),
  certifications: z.array(z.string()).optional(),
  accreditations: z.array(z.string()).optional(),
  packages: z.array(z.object({
    name: z.string(),
    testCount: z.number(),
    price: z.number(),
    tests: z.array(z.string())
  })).optional(),
  services: z.object({
    homeSampleCollection: z.boolean(),
    onlineReports: z.boolean()
  }).optional(),
  specialities: z.array(z.string()).optional(),
  image: z.object({}).optional()
});

export async function POST(req) {
  try {
    const body = await req.json();
    const result = modifyDiagnosticCenterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await dbConnect();

    const { id, ...updateData } = result.data;

    // Find and update the diagnostic center
    const updatedCenter = await DiagnosticCenter.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCenter) {
      return NextResponse.json(
        { error: "Diagnostic Center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Diagnostic Center updated successfully",
      center: updatedCenter
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
