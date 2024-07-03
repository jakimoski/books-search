import { Book, CsvBook } from "../types/types";

// Merge data from json and csv
export const mergeData = (data: Book[], csvData: CsvBook[]) => {
  return data.map((book) => ({
    ...book,
    ...csvData.find((csvBook) => csvBook.id === book.id.toString()),
  }));
};
