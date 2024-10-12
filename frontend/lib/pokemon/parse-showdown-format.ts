import { ParsedTeam, ParsedPokemon, parseStats } from "./common";

export function parseShowdownFormat(input: string): ParsedTeam {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const pokemon: ParsedPokemon[] = [];
  let currentPokemon: Partial<ParsedPokemon> = {};

  for (const line of lines) {
    if (line.includes("@")) {
      if (Object.keys(currentPokemon).length > 0) {
        pokemon.push(currentPokemon as ParsedPokemon);
      }
      currentPokemon = { ...currentPokemon, ...parseNameSpeciesItem(line) };
    } else if (line.startsWith("Ability:")) {
      currentPokemon.ability = line.split(":")[1]?.trim() ?? "";
    } else if (line.startsWith("Level:")) {
      currentPokemon.level = parseInt(line.split(":")[1]?.trim() ?? "100", 10);
    } else if (line.startsWith("Tera Type:")) {
      currentPokemon.teraType = line.split(":")[1]?.trim() ?? "";
    } else if (line.startsWith("EVs:")) {
      currentPokemon.evs = parseStats(line.split(":")[1]?.trim() ?? "");
    } else if (line.startsWith("IVs:")) {
      currentPokemon.ivs = parseStats(line.split(":")[1]?.trim() ?? "");
    } else if (line.includes("Nature")) {
      currentPokemon.nature = line.split(" ")[0];
    } else if (line.startsWith("-")) {
      if (!currentPokemon.moves) currentPokemon.moves = [];
      currentPokemon.moves.push(line.substring(1).trim());
    }
  }

  if (Object.keys(currentPokemon).length > 0) {
    pokemon.push(currentPokemon as ParsedPokemon);
  }

  return {
    metadata: { title: "Custom Team", author: "", format: "" },
    pokemon: pokemon.map((p) => ({
      ...p,
      gender: p.gender ?? "",
      evs: p.evs ?? { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: p.ivs ?? { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      imgPokemon: "",
      imgItem: "",
    })),
  };
}

function parseNameSpeciesItem(line: string): { name: string; species: string; item: string } {
  const [nameSpecies, item] = line.split("@").map((s) => s.trim());

  if (!nameSpecies) {
    console.warn("Unable to parse Pokemon name/species from line:", line); // eslint-disable-line no-console

    return { name: "", species: "Unknown", item: item ?? "" };
  }
  const match = RegExp(/^(.*?)\s*\((.*?)\)\s*$/).exec(nameSpecies);

  if (match) {
    return { name: match[1]?.trim() ?? "", species: match[2]?.trim() ?? "", item: item ?? "" };
  }

  return { name: "", species: nameSpecies.trim(), item: item ?? "" };
}
