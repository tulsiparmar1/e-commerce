import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/Product";
import connectionToDatabase from "../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectionToDatabase();
      const { id } = req.query;
      const { name, price } = req.body;
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price },
        { new: true }
      );
      return res.status(200).json(product);
    } catch (error) {
      console.log("error updating product:", error);
    }
  } else if (req.method === "GET") {
    try {
      console.log("request from productdetail page");
      const { id } = req.query;
      console.log("treq obj", req);
      const product = await Product.findById(id);
      console.log("product", product);
      return res.status(200).json(product);
    } catch (error) {
      console.log("error", error);
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await connectionToDatabase();
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Error deleting product" });
    }
  }
  res.setHeader("Allow", ["PUT", "GET", "DELETE"]);
  return res.status(405).json({ message: "Method not allowed" });
}
