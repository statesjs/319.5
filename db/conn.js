import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const pracDB = "sample_training";
const uri = process.env.MONGO_URI;

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      dbName: pracDB,
      family: 4,
    });
    console.log(`connected to ${pracDB}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export const db = mongoose.connection.db;
