const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lecq";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected → ${MONGO_URI.includes("localhost") ? "Local" : "Atlas"}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
