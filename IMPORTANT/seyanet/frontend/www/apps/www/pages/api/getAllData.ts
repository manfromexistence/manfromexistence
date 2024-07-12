import { NextApiRequest, NextApiResponse } from "next"

import connectDB from "./db"
import Content from "./model"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB()
    const content = await Content.find({})

    if (!content) {
      return res.status(404).json({ message: "Content not found" })
    }

    res.status(200).json(content)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}
