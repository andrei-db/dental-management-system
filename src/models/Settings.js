import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  clinicName: { type: String, default: "My Dental Clinic" },
  email: { type: String, default: "" },
  theme: { type: String, default: "light" },
  workingHours: {
    start: { type: String, default: "09:00" },
    end: { type: String, default: "17:00" },
  },
});

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
