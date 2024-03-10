import React, { useState } from "react";
import Modal from "./Modal";

interface SearchResultProps {
  result: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState('');

  const handleShowModal = (pokemon: string) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  return (
    <div>
      <div
        className="w-full p-1 hover:bg-gray-200 cursor-pointer hover:transition-all"
        onClick={() => handleShowModal(result)}
      >
        {result}
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} pokemon={selectedPokemon} />
    </div>
  );
};

export default SearchResult;
