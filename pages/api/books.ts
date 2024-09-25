import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'GET') {
    await db.read();
    response.status(200).json(db.data.books);
  } else {
    response.status(404).json({ status: 'error',  message: `unknown operation` });
  }
}
