import mongoose from "mongoose";

const connectionToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("database connected");
  } catch (error) {
    console.log("error", error);
  }
};

export default connectionToDatabase;
