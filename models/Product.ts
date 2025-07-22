import mongoose, { Schema, InferSchemaType, model, models } from "mongoose";

const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
export default (models.Product as mongoose.Model<Product> | undefined) ??
  model("Product", Product); // This line ensures that we use the existing model
// if it exists, or create a new one if it doesn't.

export type Product = InferSchemaType<typeof Product>;
