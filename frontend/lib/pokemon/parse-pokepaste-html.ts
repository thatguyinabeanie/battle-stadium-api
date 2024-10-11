import { ParsedTeam, PasteMetadata, ParsedPokemon, cleanImageUrl, parseStats } from "./common";

export function parsePokePasteHTML(html: string): ParsedTeam {
  if (typeof window === "undefined") return { metadata: { title: "", author: "", format: "" }, pokemon: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Parse metadata
  const aside = doc.querySelector("aside");
  const metadata: PasteMetadata = {
    title: aside?.querySelector("h1")?.textContent?.trim() ?? "",
    author:
      aside
        ?.querySelector("h2")
        ?.textContent?.trim()
        .replace(/^\s*by\s*/, "") ?? "",
    format: aside?.querySelector("p")?.textContent?.replace("Format:", "").trim() ?? "",
  };

  const articles = doc.querySelectorAll("article");

  const pokemon = Array.from(articles).map((article): ParsedPokemon => {
    const preContent = article.querySelector("pre")?.textContent ?? "";
    const lines = preContent
      .split("\\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const currentPokemon: Partial<ParsedPokemon> = {};

    for (const line of lines) {
      if (line.includes("@")) {
        const [nameSpecies, item] = line.split("@").map((s) => s.trim());

        if (nameSpecies) {
          const match = RegExp(/^(.*?)\s*\((.*?)\)\s*$/).exec(nameSpecies);

          if (match) {
            currentPokemon.name = match[1]?.trim() ?? "";
            currentPokemon.species = match[2]?.trim() ?? "";
          } else {
            currentPokemon.name = "";
            currentPokemon.species = nameSpecies.trim();
          }
        } else {
          currentPokemon.name = "";
          currentPokemon.species = "Unknown";
          console.warn("Unable to parse Pokemon name/species from line:", line); // eslint-disable-line no-console
        }

        currentPokemon.item = item ?? "";
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

    const imgDiv = article.querySelector("div");
    const imgPokemonSrc = imgDiv?.querySelector("img")?.getAttribute("src") ?? "";
    const imgItemSrc = imgDiv?.querySelectorAll("img")[1]?.getAttribute("src") ?? "";

    currentPokemon.imgPokemon = cleanImageUrl(imgPokemonSrc);
    currentPokemon.imgItem = cleanImageUrl(imgItemSrc);

    return currentPokemon as ParsedPokemon;
  });

  return {
    metadata,
    pokemon: pokemon.map((p) => ({
      ...p,
      gender: p.gender ?? "",
      evs: p.evs ?? { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: p.ivs ?? { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      moves: p.moves ?? [],
    })),
  };
}
