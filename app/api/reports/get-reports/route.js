import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import Report from "@/models/report";

export async function POST(req) {
  try {
    await dbConnect();

    const { userId, diagnosticCenterId } = await req.json();

    let query = {};

    // Build query based on provided parameters
    if (userId) {
      query.userId = userId;
    }
    if (diagnosticCenterId) {
      query.diagnosticCenterId = diagnosticCenterId;
    }

    // Find reports matching the query
    const reports = await Report.find(query).sort({ createdAt: -1 });

    return NextResponse.json(reports);

  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}
