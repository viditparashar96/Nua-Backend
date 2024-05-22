import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || "");
    if (connection) {
      console.log("Connected to MongoDB", connection.connection.host);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
