import { useCallback, useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import "./App.css";
import "./main.scss";
import { CsvBook } from "./types/types";
import { mergeData, sortBooksByProperty } from "./utils/helpers";
import BooksList from "./components/BooksList/BooksList";
import SearchInput from "./components/SearchInput/SearchInput";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
  const [books, setBooks] = useState<CsvBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch and merge data from json and csv files
  const fetchBooksData = useCallback(async () => {
    try {
      const jsonData = await fetch("data/books.json").then((res) => res.json());
      const csvData = await fetch("data/books.csv").then((res) => res.text());

      const parsedCsvData = Papa.parse(csvData, { header: true })
        .data as CsvBook[];
      const mergedBooks = mergeData(jsonData, parsedCsvData);

      setBooks(mergedBooks);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter books by search term
  const filteredBooks = useMemo(() => {
    if (searchTerm === "") {
      return books;
    }
    return books.filter(
      (book) =>
        book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book?.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book?.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  // Sort books by property
  const handleSortChange = useCallback((option: string) => {
    if (option !== "author" && option !== "title" && option !== "genre") {
      return;
    }
    setBooks((prevBooks) =>
      sortBooksByProperty(prevBooks, option as keyof CsvBook)
    );
  }, []);

  useEffect(() => {
    fetchBooksData();
  }, [fetchBooksData]);

  return (
    <div className="app">
      <h1>Books List</h1>
      <SearchInput setTerm={setSearchTerm} />
      <Dropdown
        options={["author", "title", "genre"]}
        optionHandler={handleSortChange}
      />
      <BooksList books={filteredBooks} loading={loading} term={searchTerm} />
    </div>
  );
}

export default App;
