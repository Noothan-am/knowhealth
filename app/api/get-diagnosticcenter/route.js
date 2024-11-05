import { z } from "zod";
import  dbConnect  from "@/config/dbconnect";
import DiagnosticCenter from "@/models/diagnosticCenter";
import { NextResponse } from "next/server";

const searchSchema = z.object({
  name: z.string().optional(),
  tests: z.array(z.string()).optional(),
  packages: z.array(z.string()).optional(),
  specialities: z.array(z.string()).optional(),
  pincode: z.string().optional(),
  rating: z.number().optional()
});

export async function POST(req) {
  try {
    const body = await req.json();
    const result = searchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await dbConnect();

    // Build query object based on provided search criteria
    const query = {};

    if (result.data.name) {
      query['tests.name'] = { $regex: `.*${result.data.name}.*`, $options: 'i' };
    }

    if (result.data.tests?.length) {
      query['tests.name'] = { $in: result.data.tests };
    }
    
    if (result.data.pincode) {
      query.pincode = result.data.pincode;
    }

    // Find diagnostic centers matching the criteria
    const centers = await DiagnosticCenter.find(query);

    if (!centers.length) {
      return NextResponse.json(
        { message: "No tests found matching the criteria" },
        { status: 404 }
      );
    }

    // Extract and format test information
    const tests = centers.flatMap(center => 
      center.tests.map(test => ({
        ...test.toObject(),
        diagnosticCenter: {
          id: center.id,
          name: center.name,
          email: center.email,
          phoneNo: center.phoneNo,
          address: center.address,
          city: center.city,
          state: center.state,
          pincode: center.pincode,
          rating: center.rating,
          certifications: center.certifications,
          accreditations: center.accreditations,
          services: center.services,
          specialities: center.specialities,
          image: center.image
        }
      }))
    );

    return NextResponse.json(tests, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}