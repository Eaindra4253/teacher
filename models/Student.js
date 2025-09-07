// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: [String], required: true }, // array of strings
    email: { type: String, required: false },
    phone: {
      type: String,
      required: true,
      match: [/^\d+$/, "Phone must be digits only"],
    },
    address: { type: String, required: false }, // 🆕 Address
    school: { type: String, required: false }, // 🆕 School
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.model("Student", studentSchema);
