/**
 * Pokemon API functions
 */

/**
 * Fetches a list of Pokemon from the PokeAPI
 * @returns A Promise that resolves to the list of all Pokemon
 */
export const fetchAllPokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
  const data = await response.json();
  return data.results;
};

/**
 * Filters Pokemon by name
 * @param name The search term to filter by
 * @returns Array of Pokemon objects that include the search term
 */
export const getPokemonByName = async (name: string) => {
  const allPokemon = await fetchAllPokemon();
  return allPokemon.filter((pokemon: { name: string }) =>
    pokemon.name.includes(name)
  );
};