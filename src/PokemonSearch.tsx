import React, { useRef, useMemo } from "react";
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, from, mergeMap } from "rxjs";
import { useObservable } from "./hooks/useObservable";
import { fetchAllPokemon } from "./api/pokemonApi";

 const getPokemonByName = async (name: string) => {
    const allPokemon = await fetchAllPokemon();
    return allPokemon.filter((pokemon: { name: string }) =>
      pokemon.name.includes(name)
    );
  };

const PokemonSearch = () => {
  const [search, setSearch] = React.useState<string>("");
  const [pokemonList, setPokemonList] = React.useState<any[]>([]);
  
  // Use useRef to maintain stable reference between renders
  const searchSubject = useRef(new BehaviorSubject<string>("")).current;
  
  // Create the observable pipeline inside the component
  const searchResultObservable = useMemo(() => {
    return searchSubject.pipe(
      filter(searchTerm => searchTerm.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap((searchTerm) => from(getPokemonByName(searchTerm)))
    );
  }, []);  // Empty dependency array since it doesn't depend on props/state

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
