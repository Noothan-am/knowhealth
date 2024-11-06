import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import Order from "@/models/orders";

export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find()
      .select('-_id')
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return NextResponse.json(
        { message: "No orders found" },
        { status: 404 }
      );
    }

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
