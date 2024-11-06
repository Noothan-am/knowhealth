import { z } from "zod";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbconnect";
import Order from "@/models/orders";

const orderIdSchema = z.object({
  orderId: z.string().min(1, "Order ID is required")
});

export async function POST(req) {
  try {
    const body = await req.json();
    const result = orderIdSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message }, 
        { status: 400 }
      );
    }

    await dbConnect();

    const { orderId } = result.data;

    const order = await Order.findOne({ id: orderId })
      .select('-_id')
      .lean();

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
} 