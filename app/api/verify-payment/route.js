import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Order } from '@/lib/models/Order';
import { RazorpayPayment } from '@/lib/models/RazorpayPayment';

export async function POST(req) {
  try {
    const {
      orderId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    // Update payment record
    const payment = await RazorpayPayment.findOne({ razorpayOrderId: razorpay_order_id });
    
    if (!payment) {
      return NextResponse.json({
        success: false,
        error: 'Payment record not found'
      }, { status: 404 });
    }

    if (isAuthentic) {
      // Update payment record
      await RazorpayPayment.findByIdAndUpdate(payment._id, {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        verified: true,
        verifiedAt: new Date()
      });

      // Update order status
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        status: 'confirmed'
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      // Update payment record with failure
      await RazorpayPayment.findByIdAndUpdate(payment._id, {
        status: 'failed',
        error: {
          code: 'SIGNATURE_VERIFICATION_FAILED',
          description: 'Payment signature verification failed',
          step: 'verification'
        }
      });

      return NextResponse.json({
        success: false,
        error: 'Invalid payment signature'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Payment verification failed'
    }, { status: 500 });
  }
}