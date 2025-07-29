import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import connectionToDatabase from "../../../utils/mongodb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectionToDatabase();
      const { name, email, phoneNumber, password } = req.body;
      console.log(name, email, phoneNumber, password);
      const existedUser = await User.findOne({ email });

      if (existedUser) {
        return res
          .status(400)
          .json({ message: "user already existed please login" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(name, email, phoneNumber, password);
      await User.create({ name, email, phoneNumber, password: hashedPassword });
      res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      console.log("eror", error);
      res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    try {
      await connectionToDatabase();
      const data = await User.find();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
