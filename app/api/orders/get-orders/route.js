import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Order from "@/models/orders";
import { NextResponse } from "next/server";

const getOrdersSchema = z
  .object({
    userId: z.string().optional(),
    diagnosticCenterId: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        (data.userId !== undefined) !== (data.diagnosticCenterId !== undefined)
      );
    },
    {
      message:
        "Either userId or diagnosticCenterId must be provided, but not both",
    }
  );

export async function POST(req) {
  try {
    const body = await req.json();
    const result = getOrdersSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    await dbConnect();

    const { userId, diagnosticCenterId } = result.data;

    const query = userId ? { userId } : { diagnosticCenterId };

    const orders = await Order.find(query)
      .select("-_id")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return NextResponse.json([], { status: 200 });
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
