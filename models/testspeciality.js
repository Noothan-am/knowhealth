import mongoose from "mongoose";

const TestSpecialitySchema = new mongoose.Schema({

  specialities: {
    name: {
      type: String,
      required: true,
    },
    tests: [{
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }]
  }
});

export default mongoose.models.TestSpeciality || mongoose.model('TestSpeciality', TestSpecialitySchema);