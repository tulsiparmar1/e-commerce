import mongoose, { Schema, model, models, InferSchemaType } from "mongoose";

// 1. Define the schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
});

export type UserType = InferSchemaType<typeof userSchema>;

// 3. Create model only if not already created (important in Next.js hot reloads)
const User = models.User || model("User", userSchema);

export default User;
