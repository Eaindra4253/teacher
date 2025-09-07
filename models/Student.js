import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: [String], required: true },
    email: { type: String, required: false },
    phone: {
      type: String,
      required: true,
      match: [/^\d+$/, "Phone must be digits only"],
    },
    address: { type: String },
    school: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.model("Student", studentSchema);
