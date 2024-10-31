import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
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
    required: true,
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
    type: Object,
    required: true,
  },
  current: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
export default Prescription;
