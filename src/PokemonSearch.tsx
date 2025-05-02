import React from "react";
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, from, mergeMap } from "rxjs";
import { useObservable } from "./hooks/useObservable";

const getPokemonByName = async (name: string) => {
  const { results: allPokemon } = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=1000`
  ).then((res) => res.json());
  return allPokemon.filter((pokemon: { name: string }) =>
    pokemon.name.includes(name)
  );
};

let searchSubject = new BehaviorSubject<string>("");
let searchResultObservable = searchSubject.pipe(
    filter(searchTerm => searchTerm.length > 1),
    debounceTime(500),
    distinctUntilChanged(),
    mergeMap((searchTerm) => from(getPokemonByName(searchTerm)))
);

const PokemonSearch = () => {
  const [search, setSearch] = React.useState<string>("");
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);

  useObservable(searchResultObservable, setPokemonList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchSubject.next(value);
    setSearch(value);
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
