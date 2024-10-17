import { PokemonSet } from "@pkmn/types";
import { ParsedPokemon, ParsedTeam } from "./common";
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

  return {
    metadata: { title: "Custom Team", author: "", format: "" },
    pokemon: pokemon,
  };
}

function convertToParsedPokemon(set: Partial<PokemonSet>): ParsedPokemon {
  return {
    name: set.name || "",
    species: set.species || "",
    item: set.item || "",
    ability: set.ability || "",
    level: set.level || 100,
    shiny: set.shiny || false,
    gender: set.gender || "",
    nature: set.nature || "",
    moves: set.moves || [],
    evs: {
      hp: set.evs?.hp || 0,
      atk: set.evs?.atk || 0,
      def: set.evs?.def || 0,
      spa: set.evs?.spa || 0,
      spd: set.evs?.spd || 0,
      spe: set.evs?.spe || 0,
    },
    ivs: {
      hp: set.ivs?.hp ?? 31,
      atk: set.ivs?.atk ?? 31,
      def: set.ivs?.def ?? 31,
      spa: set.ivs?.spa ?? 31,
      spd: set.ivs?.spd ?? 31,
      spe: set.ivs?.spe ?? 31,
    },
    teraType: set.teraType || "",
    imgPokemon: "",
    imgItem: "",
  };
}
