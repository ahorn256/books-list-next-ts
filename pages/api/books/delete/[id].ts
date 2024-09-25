import db from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if(request.method === 'DELETE') {
    await db.read();
    const { id } = request.query;
    const lenBefore = db.data.books.length;
    const newBooks = db.data.books.filter(book => book.id !== id);

    if(lenBefore === newBooks.length) {
      response.status(404).json({ status: 'error', message: `couldn\'t delete data with id "${id}"` });
    } else {
      db.data.books = newBooks;
      await db.write();
      response.status(200).json({ status: 'ok', message: 'data deleted', id })
    }
  } else {
    response.status(404).json({ status: 'error',  message: `unknown operation` });
  }
}
