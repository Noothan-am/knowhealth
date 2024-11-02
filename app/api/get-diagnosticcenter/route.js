import { z } from "zod";
import { dbConnect } from "@/config/dbconnect";
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
      query.name = { $regex: `.*${result.data.name}.*`, $options: 'i' };
    }

    if (result.data.tests?.length) {
      query['tests.name'] = { $in: result.data.tests };
    }
    if (result.data.specialities?.length) {
      query.specialities = { $in: result.data.specialities };
    }
    if (result.data.packages?.length) {
      query['packages.name'] = { $in: result.data.packages };
    }
    if (result.data.pincode) {
      query.pincode = result.data.pincode;
    }

    // Select only required fields
    const centers = await DiagnosticCenter.find(query).select({
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

    if (!centers.length) {
      return NextResponse.json(
        { message: "No diagnostic centers found matching the criteria" },
        { status: 404 }
      );
    }

    return NextResponse.json(centers, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
