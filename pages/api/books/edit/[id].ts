import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'PUT') {
    await db.read();
    const { id } = request.query;
    const bookIndex = id ? db.data.books.findIndex(book => book.id === id) : null;

    if(!bookIndex) {
      response.status(404).json({ status: 'error', message: `couldn\'t update data with id "${id}"` });
    } else {
      const updatedBook = { ...request.body };
      db.data.books[bookIndex] = updatedBook;
      await db.write();
      response.status(200).json({ status: 'ok', message: 'data changed', book: updatedBook });
    }
  } else {
    response.status(404).json({ status: 'error',  message: `unknown operation` });
  }
}
