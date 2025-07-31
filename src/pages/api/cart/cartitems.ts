import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../../../models/Cart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId } = req.body;
      console.log("User id from cartitmes", userId);
      const cart = await Cart.find({ userId });
      const total = cart[0].items.reduce((acc, item) => acc + item.quantity, 0);
      console.log("total", total);
      return res.status(201).json({ message: "api called", total });
    } catch (error) {
      console.log("error from backend api", error);
    }
  }
}
