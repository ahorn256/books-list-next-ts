import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'POST') {
    await db.read();
    
    const newBook = { ...request.body, id: uuidv4(), rating: request.body?.rating || 0 };
    db.data.books.push(newBook);
    
    await db.write();

    response.status(200).json({ status: 'ok', message: 'added new data', book: newBook });
  } else {
    response.status(404).json({ status: 'error',  message: `unknown operation` });
  }
}