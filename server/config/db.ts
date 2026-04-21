import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("No MONGO_URI provided in .env, skipping DB connection (waiting for user to provide).");
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
