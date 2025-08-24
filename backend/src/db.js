import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/appGymDB");
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB
