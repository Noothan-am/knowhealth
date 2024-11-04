import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  diagnosticCenterId: {
    type: String,
    required: true
  },
  tests: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  packages: [{
    name: {
      type: String,
      required: true
    },
    testCount: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    tests: [{
      type: String,
      required: true
    }]
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  homeSampleCollection: {
    type: Boolean,
    default: false
  },
  onlineReports: {
    type: Boolean,
    default: false
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
