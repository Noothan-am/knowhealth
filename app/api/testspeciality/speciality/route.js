import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import TestSpeciality from "@/models/testspeciality";
import { NextResponse } from "next/server";

const addSpecialitySchema = z.object({
  name: z.string().min(2, "Speciality name must be at least 2 characters"),
});

export async function GET() {
  try {
    await dbConnect();
    
    const specialities = await TestSpeciality.find({}, {
      'specialities.name': 1,
      'specialities.tests.name': 1,
      _id: 0
    });
    
    return NextResponse.json(specialities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch specialities" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    
    // Adding a new speciality
    const result = addSpecialitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await dbConnect();

    const { name } = result.data;

    const existingSpeciality = await TestSpeciality.findOne({ "specialities.name": name });

    if (existingSpeciality) {
      return NextResponse.json(
        { error: "Speciality already exists" },
        { status: 400 }
      );
    }

    const newSpeciality = new TestSpeciality({
      specialities: {
        name,
        tests: []
      }
    });

    await newSpeciality.save();

    return NextResponse.json(
      { message: "Speciality added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
