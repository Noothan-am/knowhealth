import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PrescriptionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
  },
  userId: {
    type: String,
  },
  doctorId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  specialty: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  current: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.models.Prescription ||
  mongoose.model("Prescription", PrescriptionSchema);
