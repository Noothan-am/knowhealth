import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import Report from "@/models/report";

export async function POST(req) {
  try {
    await dbConnect();

    const { reportId } = await req.json();

    if (!reportId) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    // Find report by ID
    const report = await Report.findOne({ id: reportId });
    console.log('Found report:', report);

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);

  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}
