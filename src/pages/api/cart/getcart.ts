import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]";
import Cart from "../../../../models/Cart";
import User from "../../../../models/User";
import Product from "../../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //used to get id of loggedin user from backend.
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    if (!session) {
      return res.status(401).json({ message: "unauthorized" });
    } else {
      try {
        const email = session?.user?.email;
        console.log("session", session);
        const id = await User.find({ email: email });

        const carts = await Cart.find({
          userId: id,
        }).populate("items.productId"); //inplace of productId it will attach all the detail of product

        return res.status(202).json(carts);
      } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "error", error });
      }
    }
  }
}
