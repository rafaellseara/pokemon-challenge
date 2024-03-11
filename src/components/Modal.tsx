import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  pokemon: string;
}

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, pokemon }) => {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);
  const [pokemonLocationData, setPokemonLocationData] = useState<any>(null);

  const getLocation = useCallback(() => {
    if (pokemonData && pokemonData.location_area_encounters) {
      fetch(pokemonData.location_area_encounters)
        .then((response) => response.json())
        .then((data) => setPokemonLocationData(data))
        .catch((error) =>
          console.error("Error fetching Pokemon location data: ", error)
        );
    }
  }, [pokemonData]);

  useEffect(() => {
    if (modalOpen && !currentPokemonId) {
      // Fetch data for the initial Pokemon
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemonData(data);
          setCurrentPokemonId(data.id);
          getLocation();
        })
        .catch((error) =>
          console.error("Error fetching Pokemon data: ", error)
        );
    } else if (modalOpen && currentPokemonId) {
      // Fetch data when currentPokemonId changes
      fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemonData(data);
          getLocation();
        })
        .catch((error) =>
          console.error("Error fetching Pokemon data: ", error)
        );
    }
  }, [modalOpen, currentPokemonId, pokemon, getLocation]);

  const handleNextButton = (): void => {
    if (currentPokemonId) {
      const nextPokemonId = currentPokemonId + 1;
      setCurrentPokemonId(nextPokemonId);
    }
  };

  const handleBeforeButton = (): void => {
    if (currentPokemonId) {
      const nextPokemonId = currentPokemonId - 1;
      setCurrentPokemonId(nextPokemonId);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white max-w-500 w-[600px] h-[420px] mx-auto flex justify-center p-4 rounded-md relative"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute transform -mt-10 right-0 top-0 rounded text-2xl py-2 px-2 bg-gray-1 text-black-2 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out z-neg-1 hover:bg-red-600 hover:text-white"
              onKeyDown={() => handleCloseModal()}
              onClick={() => handleCloseModal()}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <div>
              {pokemonData ? (
                <div>
                  <h2 className="flex justify-center items-center text-2xl font-semibold mb-4 text-orange-500">
                    {pokemonData.name.replace(/\b\w/g, (char: string) =>
                      char.toUpperCase()
                    )}
                  </h2>
                  <div className="flex flex-row justify-between space-x-16">
                    <div className="flex flex-col p-1">
                      <img
                        className="w-32 h-32 border-2 rounded border-orange-200 bg-gray-200"
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                      />
                      <h3 className="text-lg font-semibold">Abilities:</h3>
                      <ul>
                        {pokemonData.abilities.map(
                          (ability: any, index: number) => (
                            <li key={index}>{ability.ability.name}</li>
                          )
                        )}
                      </ul>
                      <h3 className="text-lg font-semibold">Types:</h3>
                      <ul>
                        {pokemonData.types.map((type: any, index: number) => (
                          <li key={index}>{type.type.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Location:</h3>
                      <div className=" bg-orange-200 border-2 border-gray-200 flex-col rounded shadow-sm flex w-72 h-48 overflow-y-scroll">
                        <ul>
                          {pokemonLocationData ? (
                            pokemonLocationData.map(
                              (location: any, index: number) => (
                                <li key={index}>
                                  {location.location_area.name}
                                </li>
                              )
                            )
                          ) : (
                            <li>No location data available</li>
                          )}
                        </ul>
                      </div>
                      <div className="flex items-end mt-4">
                        <button
                          className="mr-2 bg-orange-200 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleBeforeButton()}
                        >
                          Before
                        </button>
                        <button
                          className="ml-2 bg-orange-200 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleNextButton()}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading Pokémon...</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
