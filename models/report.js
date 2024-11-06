import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ReportSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  diagnosticCenterId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  reportFile: {
    type: String, // URL/path to the report file
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
