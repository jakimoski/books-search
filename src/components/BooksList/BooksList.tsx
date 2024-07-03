import { CsvBook } from "../../types/types";

const getHighlightedText = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1 || !highlight) {
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

function BooksList({
  books,
  term,
  loading,
}: {
  books: CsvBook[];
  term: string;
  loading: boolean;
}) {
  return (
    <div>
      {loading && <div className="loader"></div>}
      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              books.map((book) => (
                <tr key={book.id}>
                  <th scope="row">{getHighlightedText(book.title, term)}</th>
                  <td>{getHighlightedText(book.author, term)}</td>
                  <td>{getHighlightedText(book.genre, term)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        !loading && <div>No books found</div>
      )}
    </div>
  );
}

export default BooksList;
