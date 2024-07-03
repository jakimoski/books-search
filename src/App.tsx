import { useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import "./main.scss";
import { Book, CsvBook } from "./types/types";
import { mergeData } from "./utils/helpers";
import BooksList from "./components/BooksList/BooksList";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const [jsonBooks, setJsonBooks] = useState<Book[]>([]);
  const [csvBooks, setCsvBooks] = useState<CsvBook[]>([]);
  const [books, setBooks] = useState<CsvBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateBooks = useCallback(
    (term: string) => {
      const books = mergeData(jsonBooks, csvBooks);
      const currentBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(term.toLowerCase()) ||
          book.author.toLowerCase().includes(term.toLowerCase()) ||
          book.genre.toLowerCase().includes(term.toLowerCase())
      );
      setBooks(currentBooks);
    },
    [jsonBooks, csvBooks]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await fetch("data/books.json").then((res) =>
          res.json()
        );
        const csvData = await fetch("data/books.csv").then((res) => res.text());

        setCsvBooks(Papa.parse(csvData, { header: true }).data as CsvBook[]);
        setJsonBooks(jsonData);

        setBooks(
          mergeData(
            jsonData,
            Papa.parse(csvData, { header: true }).data as CsvBook[]
          )
        );
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    updateBooks(searchTerm);
  }, [searchTerm, updateBooks]);

  return (
    <div className="App">
      <SearchInput setTerm={setSearchTerm} />
      <BooksList books={books} loading={loading} term={searchTerm} />
    </div>
  );
}

export default App;
