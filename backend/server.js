import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5100;

// ✅ Enable CORS for your React app
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your frontend’s URL
//     credentials: true,
//   })
// );

connectDB();

app.use("/api/users", authRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to quiz app!");
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
