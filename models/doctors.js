import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const DoctorSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
