import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({path: "../.env"});

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI);

app.use('/user', userRoutes);
app.use("/task", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT} || enjoy ;3`);
});
