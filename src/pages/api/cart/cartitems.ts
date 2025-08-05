import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../../../models/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
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
  } else if (req.method == "DELETE") {
    try {
      const email = session?.user?.email;
      const { productId } = req.body;
      console.log("productID", productId);
      const user = await User.findOne({ email: email });
      console.log("user", user._id);
      const userId = user._id;
      // const cart = await Cart.findOne({
      //   userId: userId,
      // });
      const cart = await Cart.findOne({
        userId: userId,
      }); //inplace of productId it will attach all the detail of product

      console.log("cart", cart);

      // const newItems = cart?.items.filter(
      //   (item) => item.productId !== productId
      // );
      // const newItems = cart?.items.filter(
      //   (item) => item._id?.toString() !== productId
      // );
      // await newItems.save();
      // const newItems = cart?.items.map((item) => console.log("item", item));
      console.log("productId", productId);

      await Cart.updateOne(
        { userId: user._id },
        { $pull: { items: { _id: productId } } }
      );
      const newItems = await Cart.find({}).populate("items.productId");
      console.log("newItems", newItems);
      return res.status(201).json({
        message: "item has been removed succesfully",
        carts: newItems,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "server error" });
    }
  }
}
