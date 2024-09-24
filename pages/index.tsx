import { Book } from "@/Book";
import db from "@/db";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Props = {
  initialBooks: Book[];
}

const tableHead = {
  title: 'Titel',
  author: 'Autor',
  isbn: 'ISBN',
};

const List:NextPage<Props> = ({ initialBooks }) => {
  const [ books, setBooks ] = useState(initialBooks);

  async function handleDelete(id: string) {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    });

    if(response.ok) {
      const response = await fetch('http://localhost:3000/api/books');

      if(response.ok) {
        const data = await response.json();
        setBooks(data as Book[]);
      }
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            { Object.entries(tableHead).map(([key, val]) => <th key={key}>{val}</th>) }
          </tr>
        </thead>
        <tbody>
          { books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td><button onClick={() => handleDelete(book.id)}>delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export const getServerSideProps:GetServerSideProps = async () => {
  await db.read();
  const initialBooks:Book[] = db.data.books;

  return  {
    props: {
      initialBooks,
    }
  }
}

export default List;

