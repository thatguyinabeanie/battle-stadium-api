import { ParsedTeam, PokePasteMetadata, ParsedPokemon, cleanImageUrl, parseStats } from "./common";

export function parsePokePasteHTML(html: string, url: string): ParsedTeam {
  if (typeof window === "undefined") return { metadata: { title: "", author: "", format: "" }, pokemon: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Parse metadata (unchanged)
  const aside = doc.querySelector("aside");
  const metadata: PokePasteMetadata = {
    id: url.split("https://pokepast.es/")[1] || "",
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
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const currentPokemon: Partial<ParsedPokemon> = {
      name: "",
      species: "",
      item: "",
      ability: "",
      level: 100,
      teraType: "",
      nature: "",
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      moves: [],
      gender: "",
    };

    if (lines.length > 0) {
      const { name, species, item, gender, remainingDetails } = parseNameSpeciesItem(lines[0] ?? "");

      currentPokemon.name = name;
      currentPokemon.species = species;
      currentPokemon.item = item;
      currentPokemon.gender = gender ?? "";
      currentPokemon.moves = [];
      // Parse remaining details
      const detailLines = remainingDetails.split("\n");

      for (const line of detailLines) {
        if (line.startsWith("Ability:")) {
          currentPokemon.ability = line.split(":")[1]?.trim() ?? "";
        } else if (line.startsWith("Level:")) {
          currentPokemon.level = parseInt(line.split(":")[1]?.trim() ?? "100", 10);
        } else if (line.startsWith("Tera Type:")) {
          currentPokemon.teraType = line.split(":")[1]?.trim() ?? "";
        } else if (line.startsWith("EVs:")) {
          currentPokemon.evs = parseStats(line.split(":")[1]?.trim() ?? "") || currentPokemon.evs;
        } else if (line.startsWith("IVs:")) {
          currentPokemon.ivs = parseStats(line.split(":")[1]?.trim() ?? "") || currentPokemon.ivs;
        } else if (line.includes("Nature")) {
          currentPokemon.nature = line.split(" ")[0] || "";
        } else if (line.startsWith("-")) {
          currentPokemon.moves.push(line.substring(1).trim());
        }
      }
    }

    const imgDiv = article.querySelector("div");
    const imgPokemonSrc = imgDiv?.querySelector("img")?.getAttribute("src") ?? "";
    const imgItemSrc = imgDiv?.querySelectorAll("img")[1]?.getAttribute("src") ?? "";

    currentPokemon.imgPokemon = cleanImageUrl(imgPokemonSrc);
    currentPokemon.imgItem = cleanImageUrl(imgItemSrc);

    return currentPokemon as ParsedPokemon;
  });

  return { metadata, pokemon };
}

function parseNameSpeciesItem(line: string): {
  name: string;
  species: string;
  item: string;
  gender?: string;
  remainingDetails: string;
} {
  console.log("Parsing line:", line); // eslint-disable-line no-console

  const [nameSpecies, itemAndRest] = line.split("@").map((s) => s.trim());

  let nameSpeciesLet = nameSpecies;

  if (!nameSpeciesLet) {
    console.warn("Unable to parse Pokemon name/species from line:", line); // eslint-disable-line no-console

    return { name: "", species: "Unknown", item: "", remainingDetails: "" };
  }

  // Handle gender separately
  let gender: string | undefined;

  if (nameSpeciesLet.endsWith(" (M)") || nameSpeciesLet.endsWith(" (F)")) {
    gender = nameSpeciesLet.slice(-2, -1);
    nameSpeciesLet = nameSpeciesLet.slice(0, -4);
  }

  // Updated regex to handle forms like "Golem-Alola" or "Ursaluna-Bloodmoon"
  const match = RegExp(/^(.*?)(?:\s*\((.*?)\))?\s*$/).exec(nameSpeciesLet);

  let name, species;

  if (match) {
    name = match[1]?.trim() ?? "";
    species = match[2]?.trim() ?? name;
  } else {
    name = species = nameSpeciesLet.trim();
  }

  // Extract just the item name and the remaining details
  if (!itemAndRest) {
    return { name, species, item: "", gender, remainingDetails: "" };
  }
  const [item, ...remainingDetailsArray] = itemAndRest.split("\n");
  const remainingDetails = remainingDetailsArray.join("\n").trim();

  const obj = { name, species, item: item?.trim() || "", gender, remainingDetails };

  console.log("Parsed result:", obj); // eslint-disable-line no-console

  return obj;
}
