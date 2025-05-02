import React, { useState } from "react";
import { getPokemonByName } from "./api/pokemonApi";
import { useRxSearch } from "./hooks/useRxSearch";

const PokemonSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  
  // Use our custom hook for search functionality
  const updateSearch = useRxSearch(getPokemonByName, setPokemonList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    updateSearch(value);
  };

  return (
    <div>
      <h2>Pokemon Search</h2>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a Pokemon"
      />
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonSearch;