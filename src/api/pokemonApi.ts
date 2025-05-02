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
