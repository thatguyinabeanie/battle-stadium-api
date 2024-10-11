"use client";

import { useState, useEffect } from "react";
import { Sets, PokemonSet } from "@pkmn/sets";
import { StatsTable } from "@pkmn/types";

interface ParsedPokemon extends PokemonSet {
  imgPokemon: string;
  imgItem: string;
  ability: string;
  level: number;
  teraType: string;
  evs: StatsTable;
  nature: string;
  moves: string[];
}

function parsePokemonTeam(html: string): ParsedPokemon[] {
  if (typeof window === "undefined") return []; // Check for server-side rendering

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const articles = doc.querySelectorAll("article");

  return Array.from(articles).map((article): ParsedPokemon => {
    const preContent = article.querySelector("pre")?.textContent || "";
    const pokemonSet = Sets.importSet(preContent);

    if (!pokemonSet) throw new Error("Failed to parse Pokémon set");

    const lines = (pokemonSet.item as string).split("\\n").map((line) => line.trim());
    const item = lines[0];
    const ability = lines.find((line) => line.startsWith("Ability:"))?.replace("Ability: ", "") || "";
    const level = parseInt(lines.find((line) => line.startsWith("Level:"))?.replace("Level: ", "") || "50", 10);
    const teraType = lines.find((line) => line.startsWith("Tera Type:"))?.replace("Tera Type: ", "") || "";
    const evs = lines.find((line) => line.startsWith("EVs:"))?.replace("EVs: ", "") || "";
    const nature = lines.find((line) => line.endsWith("Nature"))?.replace(" Nature", "") || "";
    const moves = lines.filter((line) => line.startsWith("-")).map((line) => line.replace("- ", ""));

    const imgPokemon = `https://example.com/pokemon/${pokemonSet.species}.png`; // Replace with actual image URL logic
    const imgItem = `https://example.com/item/${item}.png`; // Replace with actual image URL logic

    return {
      ...(pokemonSet as PokemonSet),
      item: item as string,
      ability,
      level,
      teraType,
      evs: parseEVs(evs),
      nature,
      moves,
      imgPokemon,
      imgItem,
    };
  });
}

function parseEVs(evs: string): StatsTable {
  const evsTable: StatsTable = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

  evs.split("/").forEach((ev) => {
    const [value, stat] = ev.trim().split(" ");

    if (stat) {
      evsTable[stat.toLowerCase() as keyof StatsTable] = parseInt(value as string, 10);
    }
  });

  return evsTable;
}

interface PokePasteResults {
  teamData: ParsedPokemon[];
  loading: boolean;
  error: Error | null;
}

export function usePokePaste(url?: string | null): PokePasteResults {
  const [teamData, setTeamData] = useState<ParsedPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    async function fetchTeamData(url: string) {
      try {
        const response = await fetch("/api/pokepaste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const html = await response.text();
        const parsedData = parsePokemonTeam(html);

        setTeamData(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        setLoading(false);
      }
    }

    if (!url) {
      setLoading(false);

      return;
    }
    if (!/^https:\/\/pokepast\.es\/[a-zA-Z0-9]+$/.test(url)) {
      setError(new Error("Invalid URL format"));
      setLoading(false);

      return;
    }
    fetchTeamData(url);
  }, [url]);

  return { teamData, loading, error };
}
