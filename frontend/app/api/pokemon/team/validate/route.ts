import { ParsedPokemon } from "@/lib/pokemon/common";
import { NextRequest, NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";

export const runtime = "edge";

const P = new Pokedex();

const validTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const validTeraTypes = [...validTypes, "stellar"];

function toLowerCaseReplaceSpace(value: string) {
  return value.toLowerCase().replace(/ /g, "-");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pokemon: ParsedPokemon = body.pokemon;

  try {
    const pokemonData = await P.getPokemonByName(pokemon.species.toLowerCase());

    const validItem = pokemon.item ? await P.getItemByName(toLowerCaseReplaceSpace(pokemon.item)) : null;

    const lowercaseAbility = toLowerCaseReplaceSpace(pokemon.ability);

    const validAbility = pokemonData.abilities.find(({ ability }) => ability.name === lowercaseAbility);
    const invalidMoves = pokemon.moves
      .map(toLowerCaseReplaceSpace)
      .filter((pokemon_move: string) => !pokemonData.moves.find(({ move }) => move.name === pokemon_move))
      .map((move) => move.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()));

    const validTeraType = validTeraTypes.includes(pokemon.teraType?.toLowerCase() ?? "");

    if (!validTeraType) {
      return NextResponse.json({ message: "Invalid Tera Type" }, { status: 400 });
    }

    const invalid = {
      item: !validItem,
      ability: !validAbility,
      moves: invalidMoves,
      teraType: !validTeraType,
    };

    const officialArtwork = pokemonData.sprites.other["official-artwork"];

    const parsedPokemon = {
      ...pokemon,
      imgPokemon: pokemon.shiny ? officialArtwork.front_shiny : officialArtwork.front_default,
      imgItem: validItem?.sprites.default,
    };

    return NextResponse.json({ pokemon: parsedPokemon, invalid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error fetching Pokemon data: ${error}` }, { status: 500 });
  }
}
