import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/nextjs_ecommerce";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to MongoDB.");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
