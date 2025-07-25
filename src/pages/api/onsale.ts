import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import connectionToDatabase from "../../../utils/mongodb";
import Product from "../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectionToDatabase();
  if (req.method === "GET") {
    try {
      const SaleItems = await Product.find({ isOnSale: true });
      return res.status(200).json(SaleItems);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
