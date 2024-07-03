import { useCallback, useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import "./main.scss";
import { Book, CsvBook } from "./types/types";
import {
  mergeData,
  sortBooksByAuthor,
  sortBooksByGenre,
  sortBooksByTitle,
} from "./utils/helpers";
import BooksList from "./components/BooksList/BooksList";
import SearchInput from "./components/SearchInput/SearchInput";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const [jsonBooks, setJsonBooks] = useState<Book[]>([]);
  const [csvBooks, setCsvBooks] = useState<CsvBook[]>([]);
  const [books, setBooks] = useState<CsvBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchBooksData = useCallback(async () => {
    try {
      const [jsonData, csvData] = await Promise.all([
        fetch("data/books.json").then((res) => res.json()),
        fetch("data/books.csv").then((res) => res.text()),
      ]);

      const parsedCsvData = Papa.parse(csvData, { header: true })
        .data as CsvBook[];

      setJsonBooks(jsonData);
      setCsvBooks(parsedCsvData);
      setBooks(mergeData(jsonData, parsedCsvData));
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBooks = useCallback(() => {
    const mergedBooks = mergeData(jsonBooks, csvBooks);
    const filteredBooks = mergedBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);
  }, [jsonBooks, csvBooks, searchTerm]);

  const handleChange = useCallback((option: string) => {
    switch (option) {
      case "author":
        setBooks((prevBooks) => sortBooksByAuthor(prevBooks));
        break;
      case "title":
        setBooks((prevBooks) => sortBooksByTitle(prevBooks));
        break;
      case "genre":
        setBooks((prevBooks) => sortBooksByGenre(prevBooks));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);

  useEffect(() => {
    updateBooks();
  }, [searchTerm, updateBooks]);

  console.log("render times");

  return (
    <div className="App">
      <SearchInput setTerm={setSearchTerm} />
      <Dropdown
        options={["author", "title", "genre"]}
        optionHandler={handleChange}
      />
      <BooksList books={books} loading={loading} term={searchTerm} />
    </div>
  );
}

export default App;
