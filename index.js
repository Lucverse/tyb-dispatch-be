import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import cors from "cors";
import dispatchRouter from "./routes/dispatch.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/tyb-dispatch", dispatchRouter);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res); // Delegate to Express
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Internal Server Error");
  }
}