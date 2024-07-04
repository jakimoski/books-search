import { Book, CsvBook } from "../types/types";

// Sort data by property
export const sortBooksByProperty = (
  books: CsvBook[],
  property: keyof CsvBook
) => {
  return [...books].sort((a, b) => a[property].localeCompare(b[property]));
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
