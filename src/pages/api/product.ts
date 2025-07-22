import { NextApiResponse, NextApiRequest } from "next";
import connectionToDatabase from "../../../utils/mongodb";
import Product from "../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectionToDatabase();
    if (req.method === "GET") {
      try {
        const products = await Product.find({});
        return res.status(200).json(products);
      } catch (error) {
        console.log("error", error);
        res.status(501).json(error);
      }
    } else if (req.method === "POST") {
      try {
        const { name, price } = req.body;
        const product = await Product.create({ name, price });
        return res.status(201).json(product);
      } catch (error) {
        console.log("error", error);
        res.status(501).json(error);
      }
    }
  } catch (e) {
    console.log("error", e);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
