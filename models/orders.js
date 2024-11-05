import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  diagnosticCenterId: {
    type: String,
    required: true,
    ref: 'DiagnosticCenter'
  },
  item: {
    type: {
      type: String,
      enum: ['test', 'package'],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  isHomeSampleCollection: {
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

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);