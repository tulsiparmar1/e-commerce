import mongoose, { Schema, InferSchemaType, model, models } from "mongoose";

const CartItem = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    reqired: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: {
    required: true,
    type: Number,
    default: 1,
    min: 1,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});
const Cart = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItem],
    updatedAt: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: true, //auto update created at and updatedat field.
  }
);
export default (models.Cart as mongoose.Model<Cart> | undefined) ??
  model("Cart", Cart);

export type Cart = InferSchemaType<typeof Cart>;
