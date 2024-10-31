const mongoose = require('mongoose');

const DiagnosticCenterSchema = new mongoose.Schema({
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
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
  }],
  certifications: [{
    type: String
  }],
  accreditations: [{
    type: String
  }],
  packages: [{
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
    tests: [{
      type: String,
      required: false
    }]
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
    type: Object,
    required: false
  },
});

module.exports = mongoose.models.DiagnosticCenter || mongoose.model('DiagnosticCenter', DiagnosticCenterSchema);