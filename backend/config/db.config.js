import mongoose from "mongoose";
import config from "./index.js";

// Destructure all useful tools
const { Schema, model, models, Types, connection } = mongoose;

// Connect only once
async function connectDB() {
  if (connection.readyState === 0) {
    try {
      console.log("🌀 Waiting for DB connection...");
      const con=await mongoose.connect(config.MONGOURL);
      console.log("✅ MongoDB connected at "+con.connection.host);
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
    }
  } else {
    console.log("⚠️ MongoDB already connected");
  }
}

// Export all the destructured items
export { Schema, model, models, Types, connection };
export default connectDB;