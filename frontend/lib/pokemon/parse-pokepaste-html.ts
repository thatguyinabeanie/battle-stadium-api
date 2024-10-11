import { ParsedTeam, PasteMetadata, ParsedPokemon, cleanImageUrl, parseStats } from "./common";

export function parsePokePasteHTML(html: string): ParsedTeam {
  if (typeof window === "undefined") return { metadata: { title: "", author: "", format: "" }, pokemon: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Parse metadata
  const aside = doc.querySelector("aside");
  const metadata: PasteMetadata = {
    title: aside?.querySelector("h1")?.textContent?.trim() || "",
    author:
      aside
        ?.querySelector("h2")
        ?.textContent?.trim()
        .replace(/^\s*by\s*/, "") || "",
    format: aside?.querySelector("p")?.textContent?.replace("Format:", "").trim() || "",
  };

  const articles = doc.querySelectorAll("article");

  const pokemon = Array.from(articles).map((article): ParsedPokemon => {
    const preContent = (article.querySelector("pre")?.textContent || "").split("\n");

    const lines = preContent.map((line) => line.trim()).filter(Boolean);

    const speciesLine = (lines[0] && lines[0].split(" @ ")) as string[];
    const species = speciesLine[0]?.trim() || "";
    const itemLine = speciesLine[1] ? speciesLine[1].split("\\n") : [];
    const item = (itemLine[0] || "").trim();

    const ability = (itemLine.find((line) => line.startsWith("Ability:"))?.split(": ")[1] || "").trim();
    const level = parseInt((itemLine.find((line) => line.startsWith("Level:"))?.split(": ")[1] || "100").trim(), 10);
    const teraType = (itemLine.find((line) => line.startsWith("Tera Type:"))?.split(": ")[1] || "").trim();
    const nature = (itemLine.find((line) => line.includes("Nature"))?.split(" ")[0] || "").trim();

    const moves = itemLine.filter((line) => line.startsWith("-")).map((line) => line.substring(2).trim());

    const evsLine = (itemLine.find((line) => line.startsWith("EVs:"))?.split(": ")[1] || "").trim();
    const ivsLine = (itemLine.find((line) => line.startsWith("IVs:"))?.split(": ")[1] || "").trim();

    const imgDiv = article.querySelector("div");
    const imgPokemonSrc = (imgDiv?.querySelector("img")?.getAttribute("src") || "").replace(/^["']|["']$/g, "").trim();
    const imgItemSrc = (imgDiv?.querySelectorAll("img")[1]?.getAttribute("src") || "").replace(/^["']|["']$/g, "").trim();

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
      evs: parseStats(evsLine, 0),
      ivs: parseStats(ivsLine),
      nature,
      moves,
      imgPokemon,
      imgItem,
    };
  });

  return { metadata, pokemon };
}
