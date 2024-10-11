import { ParsedTeam, ParsedPokemon } from "./common";

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
      currentPokemon = {};
      const [species, item] = line.split("@").map((s) => s.trim());

      currentPokemon.species = species;
      currentPokemon.item = item;
    } else if (line.startsWith("Ability:")) {
      currentPokemon.ability = line.split(":")[1].trim();
    } else if (line.startsWith("Level:")) {
      currentPokemon.level = parseInt(line.split(":")[1].trim(), 10);
    } else if (line.startsWith("Tera Type:")) {
      currentPokemon.teraType = line.split(":")[1].trim();
    } else if (line.startsWith("EVs:")) {
      currentPokemon.evs = parseStats(line.split(":")[1].trim());
    } else if (line.startsWith("IVs:")) {
      currentPokemon.ivs = parseStats(line.split(":")[1].trim());
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
      name: "",
      gender: "",
      evs: p.evs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: p.ivs || {},
      imgPokemon: "", // You might want to add a function to get default images
      imgItem: "",
    })),
  };
}
