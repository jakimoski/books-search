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
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          name="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          type="text"
          placeholder="Search..."
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchInput;
