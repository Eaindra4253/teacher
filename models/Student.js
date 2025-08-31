import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true },
    major: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
