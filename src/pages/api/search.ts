import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import connectionToDatabase from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { q } = req?.query; //this will contain simple query such as "summer kurti"
    await connectionToDatabase();
    if (!q) return res.status(400).json({ message: "Query is required" });

    const keywords = q.trim().split(/\s+/); //this will contain array of each words
    const regexCondition = keywords.map((word) => {
      const regex = new RegExp(word, "i"); //make regex string with i means incasesensitivity
      return {
        $or: [{ name: regex }, { description: regex }, { category: regex }], //it will return structur
        //  for all the array element
      };
    });

    // const searchedProduct = await Product.find({
    //   $or: [
    //     { name: regex }, //matched /kurti/i in name
    //     {
    //       description: regex,
    //     },
    //     { category: regex },
    //   ],
    // });

    const searchedProduct = await Product.find({
      $and: regexCondition,
    });
    res.status(201).json(searchedProduct);
  }
}
