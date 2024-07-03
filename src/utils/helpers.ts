import { Book, CsvBook } from "../types/types";

export const sortBooksByAuthor = (books: CsvBook[]) => {
  return [...books].sort((a, b) => a.author.localeCompare(b.author));
};

export const sortBooksByTitle = (books: CsvBook[]) => {
  return [...books].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortBooksByGenre = (books: CsvBook[]) => {
  return [...books].sort((a, b) => a.genre.localeCompare(b.genre));
};

// Merge and sort data by author data from json and csv
export const mergeData = (data: Book[], csvData: CsvBook[]) => {
  return data
    .map((book) => ({
      ...book,
      ...csvData.find((csvBook) => csvBook.id === book.id.toString()),
    }))
    .sort((a, b) => a.author.localeCompare(b.author)) as CsvBook[];
};
