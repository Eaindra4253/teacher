import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/students.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
