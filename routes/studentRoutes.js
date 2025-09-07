import express from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  importFromSheet,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/import-sheet", importFromSheet); // <-- New endpoint to import from Google Sheet

export default router;
