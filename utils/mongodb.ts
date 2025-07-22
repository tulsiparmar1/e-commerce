import mongoose from "mongoose";

const connectionToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("database connected");
  } catch (error) {
    console.log("error", error);
  }
};

export default connectionToDatabase;
