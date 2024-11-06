import mongoose from 'mongoose';

const razorpayPaymentSchema = new mongoose.Schema({
  // Reference to our Order
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    index: true
  },

  // Razorpay Order Details
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    sparse: true // Allows null but ensures uniqueness when value exists
  },
  razorpaySignature: {
    type: String,
    sparse: true
  },

  // Payment Details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'attempted', 'paid', 'failed'],
    default: 'created'
  },

  // Payment Response
  paymentResponse: {
    type: mongoose.Schema.Types.Mixed, // Stores complete Razorpay response
    default: null
  },

  // Error Details (if any)
  error: {
    code: String,
    description: String,
    source: String,
    step: String,
    reason: String
  },

  // Verification Details
  verified: {
    type: Boolean,
    default: false
  },
  verifiedAt: Date,

  // Metadata
  notes: {
    type: Map,
    of: String,
    default: new Map()
  }
}, {
  timestamps: true
});

// Indexes
razorpayPaymentSchema.index({ createdAt: -1 });
razorpayPaymentSchema.index({ status: 1 });
razorpayPaymentSchema.index({ 'error.code': 1 });

export const RazorpayPayment = mongoose.models.RazorpayPayment || 
  mongoose.model('RazorpayPayment', razorpayPaymentSchema);