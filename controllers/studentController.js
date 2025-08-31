import Student from "../models/Student.js";

// Get all students
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// Get single student
export const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

// Create new student
export const createStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  const saved = await newStudent.save();
  res.status(201).json(saved);
};

// Update student
export const updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ message: "Student not found" });
  res.json(updated);
};

// Delete student
export const deleteStudent = async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Student not found" });
  res.json(deleted);
};
