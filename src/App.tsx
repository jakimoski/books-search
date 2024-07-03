import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import "./main.scss";
import { CsvBook } from "./types/types";
import { mergeData } from "./utils/helpers";

const string = "Hello, world it me hell!";

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

function App() {
  const [data, setData] = useState<Book[]>([]);
  const [csvData, setCsvData] = useState<CsvBook[]>([]);

  const getHighlightedText = (text: string, highlight: string) => {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    if (parts.length === 1) {
      return text;
    }

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: "red" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await fetch("/books.json")
          .then((res) => res.json())
          .then((data) => {
            return data;
          });
        const csvData = await fetch("/books.csv").then((res) => res.text());

        console.log(csvData, jsonData);

        setCsvData(Papa.parse(csvData, { header: true }).data as []);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getData();
  }, []);

  const mergedData = mergeData(data, csvData);

  console.log(mergedData);

  return (
    <div className="App">
      <p>{getHighlightedText(string, "wo")}</p>
    </div>
  );
}

export default App;
