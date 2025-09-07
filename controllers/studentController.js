import Student from "../models/Student.js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

// --- CRUD ---
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, grade, subject, email, phone, address, school } = req.body;
    const student = new Student({
      name,
      grade,
      subject: Array.isArray(subject) ? subject : [subject],
      email,
      phone,
      address,
      school,
    });
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

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
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Google Sheets Import ---
export const importFromSheet = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "credentials.json"), // downloaded JSON
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
    const RANGE = "Sheet1!A:G"; // adjust columns

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "No data found in sheet" });
    }

    const headers = rows[0];
    const dataRows = rows.slice(1);

    for (const row of dataRows) {
      const studentObj = {};
      headers.forEach((header, i) => {
        const key = header.toLowerCase().replace(/\s/g, "_"); // normalize
        studentObj[key] = row[i] || "";
      });

      // Upsert by email (or name + phone)
      await Student.findOneAndUpdate(
        { email: studentObj.email },
        {
          name: studentObj.name,
          grade: studentObj.grade,
          subject: studentObj.subject
            ? studentObj.subject.split(",").map((s) => s.trim())
            : [],
          email: studentObj.email,
          phone: studentObj.phone,
          address: studentObj.address,
          school: studentObj.school,
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Imported successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Import failed" });
  }
};
