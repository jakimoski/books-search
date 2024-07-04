import { CsvBook } from "../../types/types";

const getHighlightedText = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, "i");
  const parts = text.split(regex);

  if (parts.length === 1 || !highlight) {
    return text;
  }

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="books-list__highlight">
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
    <section className="books-list">
      {loading && <div className="loader"></div>}
      {books.length > 0 ? (
        <table className="books-list__table">
          <thead>
            <tr className="books-list__header-row">
              <th className="books-list__header-cell">Title</th>
              <th className="books-list__header-cell">Author</th>
              <th className="books-list__header-cell">Genre</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              books.map((book) => (
                <tr key={book.id} className="books-list__row">
                  <td className="books-list__cell">
                    {getHighlightedText(book.title, term)}
                  </td>
                  <td className="books-list__cell">
                    {getHighlightedText(book.author, term)}
                  </td>
                  <td className="books-list__cell">
                    {getHighlightedText(book.genre, term)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        !loading && <div className="books-list__no-books">No results found</div>
      )}
    </section>
  );
}

export default BooksList;
