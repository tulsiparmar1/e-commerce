import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { email, password } = req.body;
      const existingUser = await User.find({ email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ message: "user is not exist please register first" });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
}
