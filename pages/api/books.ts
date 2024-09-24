import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await db.read();
  response.status(200).json(db.data.books);
}
