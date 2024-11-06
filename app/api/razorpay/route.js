import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import  Order  from '@/models/orders';
import  RazorpayPayment  from '@/models/razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { orderId, amount } = data;

    // Verify order exists and is pending payment
    const order = await Order.findById(orderId);
    if (!order || order.paymentStatus !== 'pending') {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid order' 
      }, { status: 400 });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: orderId,
    });

    // Create payment record
    await RazorpayPayment.create({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: amount,
      status: 'created',
      notes: new Map([
        ['orderType', 'test_booking'],
        ['patientName', order.patientName]
      ])
    });

    return NextResponse.json({
      id: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create payment order' 
    }, { status: 500 });
  }
}