import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    specialization: { type: String, required: true }, 
    experience: { type: Number },
    nextAvailable: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
