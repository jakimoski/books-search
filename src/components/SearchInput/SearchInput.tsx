import { useState } from "react";

type Props = {
  setTerm: (term: string) => void;
};

function SearchInput({ setTerm }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTerm(searchTerm);
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search by title, author, or genre..."
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default SearchInput;
