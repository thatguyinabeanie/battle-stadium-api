import { useState, useEffect } from "react";
import { PokemonSet } from "@pkmn/sets";
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

function parsePokemonTeam(html: string): ParsedPokemon[] {
  if (typeof window === "undefined") return []; // Check for server-side rendering

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const articles = doc.querySelectorAll("article");

  return Array.from(articles).map((article): ParsedPokemon => {
    const preContent = (article.querySelector("pre")?.textContent || "").split("\n");

    const lines = preContent.map((line) => line.trim()).filter(Boolean);

    const speciesLine = (lines[0] && lines[0].split(" @ ")) as string[];
    const species = speciesLine[0] as string;
    const itemLine = speciesLine[1] ? speciesLine[1].split("\\n") : [];
    const item = itemLine[0] || "";

    const ability = itemLine.find((line) => line.startsWith("Ability:"))?.split(": ")[1] || "";
    const level = parseInt(itemLine.find((line) => line.startsWith("Level:"))?.split(": ")[1] || "100", 10);
    const teraType = itemLine.find((line) => line.startsWith("Tera Type:"))?.split(": ")[1] || "";
    const nature = itemLine.find((line) => line.includes("Nature"))?.split(" ")[0] || "";

    const moves = itemLine.filter((line) => line.startsWith("-")).map((line) => line.substring(2).trim());

    const evsLine = itemLine.find((line) => line.startsWith("EVs:"))?.split(": ")[1] || "";
    const ivsLine = itemLine.find((line) => line.startsWith("IVs:"))?.split(": ")[1] || "";

    const imgDiv = article.querySelector("div");
    const imgPokemonSrc = (imgDiv?.querySelector("img")?.getAttribute("src") || "").replace(/^["']|["']$/g, "");
    const imgItemSrc = (imgDiv?.querySelectorAll("img")[1]?.getAttribute("src") || "").replace(/^["']|["']$/g, "");

    const imgPokemon = cleanImageUrl(imgPokemonSrc);
    const imgItem = cleanImageUrl(imgItemSrc);

    return {
      name: "",
      species,
      gender: "",
      item,
      ability,
      level,
      teraType,
      evs: parseStats(evsLine),
      ivs: parseStats(ivsLine),
      nature,
      moves,
      imgPokemon,
      imgItem,
    };
  });
}

function cleanImageUrl(url: string): string {
  // Remove any quotes and extra spaces
  url = url.replace(/["'\s]/g, "");

  // Ensure the URL starts with a forward slash
  if (url && !url.startsWith("/")) {
    url = "/" + url;
  }

  // Prepend the base URL only if we have a valid path
  return url ? `https://pokepast.es${url}` : "";
}

function parseStats(statsLine: string, defaultValue?: number): StatsTable {
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
