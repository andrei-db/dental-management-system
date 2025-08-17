import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    doctor: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
