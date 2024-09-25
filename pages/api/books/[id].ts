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
      db.write();
      response.status(200).json({ status: 'ok', message: 'data deleted', id })
    }
  } else if(request.method === 'PUT') {
    await db.read();
    const { id } = request.query;
    const bookIndex = id ? db.data.books.findIndex(book => book.id === id) : null;

    if(!bookIndex) {
      response.status(404).json({ status: 'error', message: `couldn\'t update data with id "${id}"` });
    } else {
      const updatedBook = { ...request.body };
      db.data.books[bookIndex] = updatedBook;
      db.write();
      response.status(200).json({ status: 'ok', message: 'data changed', book: updatedBook });
    }
  } else {
    response.status(404).json({ status: 'error',  message: `unknown operation` });
  }
}
