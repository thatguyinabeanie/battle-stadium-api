import { ParsedPokemon } from "@/lib/pokemon/common";
import { NextRequest, NextResponse } from "next/server";
import Pokedex from "pokedex-promise-v2";

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
  return value.toLowerCase().replace(" ", "-");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pokemon: ParsedPokemon = body.pokemon;

  try {
    const pokemonData = await P.getPokemonByName(pokemon.species.toLowerCase());
    const validItem = pokemon.item ? await P.getItemByName(toLowerCaseReplaceSpace(pokemon.item)) : null;
    const validAbility = pokemonData.abilities.find(
      ({ ability }) => ability.name === toLowerCaseReplaceSpace(pokemon.ability),
    );
    const invalidMoves = pokemon.moves.filter(
      (pokemon_move: string) =>
        !pokemonData.moves.find(({ move }) => move.name === toLowerCaseReplaceSpace(pokemon_move)),
    );

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

    const imgPokemon =
      (pokemon.imgPokemon ?? pokemon.shiny) ? officialArtwork.front_shiny : officialArtwork.front_default;

    const parsedPokemon = {
      ...pokemon,
      imgPokemon,
      imgItem: validItem?.sprites.default,
    };

    return NextResponse.json({ parsedPokemon, invalid }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);

    return NextResponse.json({ message: "Error fetching Pokemon data" }, { status: 500 });
  }
}
