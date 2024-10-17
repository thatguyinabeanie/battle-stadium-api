import { convertToParsedPokemon, ParsedPokemon, ParsedTeam } from "./common";
import { Sets } from "@pkmn/sets";

export function parseShowdownFormat(input: string): ParsedTeam {
  const lines = input.split("\n");
  const pokemon: ParsedPokemon[] = [];
  let currentSetString = "";

  for (const line of lines) {
    if (line.trim() === "") {
      if (currentSetString) {
        const set = Sets.importSet(currentSetString);

        pokemon.push(convertToParsedPokemon(set));
        currentSetString = "";
      }
    } else {
      currentSetString += line + "\n";
    }
  }

  // Handle the last set if there's no trailing newline
  if (currentSetString) {
    const set = Sets.importSet(currentSetString);

    pokemon.push(convertToParsedPokemon(set));
  }

  if (pokemon.length > 6) {
    throw new Error("A team cannot have more than 6 Pokemon.");
  }

  return {
    metadata: { title: "Custom Team", author: "", format: "" },
    pokemon: pokemon,
  };
}
