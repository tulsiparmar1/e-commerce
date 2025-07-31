import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../../../models/Cart";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, productId, size, color, quantity } = req.body;
      if (!productId || !size || !color) {
        return res.status(400).json({ message: "please fill all the info" });
      }
      let cart = await Cart.findOne({ userId });
      // first time when user add any item then it will create this...
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId?.toString() === productId &&
          item.size == size &&
          item.color == color
      );

      //if there is any cart exist then it will add quantity
      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ userId, productId, quantity, size, color });
      }
      // console.log("item index", cart.items);
      await cart.save();
      return res
        .status(200)
        .json({ message: "item added successfully ", cart });
    } catch (error) {
      console.log("error from backend", error);
    }
  }
}
