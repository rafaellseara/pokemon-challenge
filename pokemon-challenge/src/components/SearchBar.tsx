import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Pokemon {
  name: string;
}

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value: string): void => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const filteredResults = data.results.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().startsWith(value.toLowerCase())
        );
        setResults(filteredResults);
      });
  };

  const handleChange = (value: any): void => {
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="flex border rounded-full p-3 m-2 px-5 bg-white shadow-lg">
      <div className="pt-2 mr-3">
        <FaSearch className="text-rose-500" id="search-icon" />
      </div>
      <div>
        <input
          className="focus:outline-none w-80 text-xl"
          placeholder="Type to search for a pokemon..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
