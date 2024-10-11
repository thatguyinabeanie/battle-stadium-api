import { PokemonSet, StatsTable } from "@pkmn/types";

export interface OptionalStatsPokemonSet extends Omit<PokemonSet, "evs" | "ivs"> {
  evs?: Partial<StatsTable>;
  ivs?: Partial<StatsTable>;
}

export interface ParsedPokemon extends OptionalStatsPokemonSet {
  imgPokemon: string;
  imgItem: string;
  type_slot_one?: string;
  type_slot_two?: string;
}

export interface ValidatedPokemon {
  pokemon: ParsedPokemon;
  invalid: {
    item: boolean;
    ability: boolean;
    moves: string[];
    teraType: boolean;
  };
}

export interface PasteMetadata {
  title: string;
  author: string;
  format: string;
}

export interface ParsedTeam {
  metadata: PasteMetadata;
  pokemon: ParsedPokemon[];
}

export interface PokePasteResults {
  teamData: ParsedTeam | null;
  loading: boolean;
  error: Error | null;
}

export function cleanImageUrl(url: string): string {
  // Remove any quotes and extra spaces
  url = url.replace(/["'\s]/g, "");

  // Ensure the URL starts with a forward slash
  if (url && !url.startsWith("/")) {
    url = "/" + url;
  }

  if (url && url.startsWith("/img/pokemon/0-0.png")) {
    return "";
  }

  // Prepend the base URL only if we have a valid path
  return url ? `https://pokepast.es${url}` : "";
}

export function parseStats(statsLine: string, defaultValue?: number): StatsTable {
  const statsTable: Partial<StatsTable> = {};

  statsLine.split("/").forEach((stat) => {
    const [value, name] = stat.trim().split(" ");

    if (name && value) {
      const statKey = name.toLowerCase() as keyof StatsTable;

      statsTable[statKey] = parseInt(value, 10);
    }
  });

  if (defaultValue !== undefined) {
    const allStats: (keyof StatsTable)[] = ["hp", "atk", "def", "spa", "spd", "spe"];

    allStats.forEach((stat) => {
      if (statsTable[stat] === undefined) {
        statsTable[stat] = defaultValue;
      }
    });
  }

  return statsTable as StatsTable;
}
