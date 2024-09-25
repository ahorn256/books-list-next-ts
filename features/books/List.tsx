import React, { useEffect, useMemo, useState } from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Delete, Edit, Star, StarBorder } from "@mui/icons-material";
import { Book, BookSort, BookSortIn } from "./Book";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectBooks, selectBooksLoadingError, selectBooksLoadingState } from "./booksSlice";
import { filterBooks, sortBooks } from "./booksHelpers";
import ErrorMessage from "../../ErrorMessage";
import { loadBooksAction } from "./books.actions";
import BookInfo from "./BookInfo";
import { useTranslations } from "next-intl";
import DeletionDialog from "./DeletionDialog";
import FormDialog from "./FormDialog";

type Props = {
  filterByTitle?: string,
}
const List:React.FC<Props> = ({ filterByTitle }) => {
  const [ sort, setSort ] = useState<BookSort>({
    orderBy: 'title',
    order: 'asc',
  });
  const books = useAppSelector(selectBooks);
  const booksLoadingState = useAppSelector(selectBooksLoadingState);
  const booksLoadingError = useAppSelector(selectBooksLoadingError);
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [ deleteId, setDeleteId ] = useState<string|null>(null);
  const [ editId, setEditId ] = useState<string|null>(null);
  const filteredBooks = useMemo<Book[]>(() =>
    sortBooks(
      filterByTitle ?
        filterBooks(books, filterByTitle) :
        books, sort),
    [sort, books, filterByTitle]);

  const tableHead = useMemo(() => ({
    title: t('book.title'),
    author: t('book.author'),
    isbn: t('book.isbn'),
    rating: t('book.rating'),
  }), [ t ]);

  useEffect(() => {
    dispatch(loadBooksAction.request());
  }, [dispatch]);
  
  function onDelete(book:Book) {
    setDeleteId(book.id);
  }

  function onEdit(book:Book) {
    setEditId(book.id);
  }

  return (
    <>
      <Paper>
        { booksLoadingState === 'error' && <ErrorMessage error={booksLoadingError}/> }
        <Table>
          <TableHead>
            <TableRow>
              {Object.entries(tableHead).map(([key, head]) => (
                <TableCell key={key}>
                  {head}
                  <TableSortLabel
                    active={sort.orderBy === head}
                    direction={sort.order}
                    onClick={() => {
                      setSort({
                        orderBy: key as BookSortIn,
                        order: sort.order === 'asc' ? 'desc' : 'asc'
                      });
                    }} />
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map(book => (
              <TableRow key={book.id}>
                <TableCell><BookInfo book={book}/></TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{Array(5).fill(0).map((item, index) => index < book.rating ? <Star key={index} /> : <StarBorder key={index} />)}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit book" onClick={() => onEdit(book)}>
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete book" onClick={() => onDelete(book)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      { deleteId && <DeletionDialog id={deleteId} onClose={() => setDeleteId(null)}/> }
      { editId && <FormDialog id={editId} onClose={() => setEditId(null)}/> }
    </>
  );
}

export default List;
