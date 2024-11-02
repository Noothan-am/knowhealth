import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const DiagnosticCenterSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
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
  phoneNo: {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  tests: [{
    id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    speciality: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    }
  }],
  certifications: [{
    type: String
  }],
  accreditations: [{
    type: String
  }],
  packages: [{
    id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    name: {
      type: String,
      required: false
    },
    testCount: {
      type: Number,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    specialities: [{
      type: String,
      required: false
    }],
    tests: [{
      type: String,
      required: false
    }],
    description: {
      type: String,
      required: false
    }
  }],
  services: {
    homeSampleCollection: {
      type: Boolean,
      default: false
    },
    onlineReports: {
      type: Boolean,
      default: false
    }
  },
  specialities: [{
    type: String
  }],
  image: {
    type: String,
    required: false
  },
  timings: {
    type: Object,
    required: false
  } 
});
export default mongoose.models.DiagnosticCenter || mongoose.model('DiagnosticCenter', DiagnosticCenterSchema);