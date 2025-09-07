// controllers/studentController.js
import Student from "../models/Student.js";

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single student
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new student
export const createStudent = async (req, res) => {
  try {
    const { name, grade, subject, email, phone, address, school } = req.body;

    const newStudent = new Student({
      name,
      grade,
      subject: Array.isArray(subject) ? subject : [subject],
      email,
      phone,
      address,
      school,
    });

    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { name, grade, subject, email, phone, address, school } = req.body;

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        grade,
        subject: Array.isArray(subject) ? subject : [subject],
        email,
        phone,
        address,
        school,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
