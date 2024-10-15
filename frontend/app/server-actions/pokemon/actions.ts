"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { ValidatedPokemon, PokePasteMetadata } from "@/lib/pokemon/common";
import { FetchOptions } from "openapi-fetch";

export const runtime = "edge";

type PostPokemonTeamBody = {
  pokepaste_id?: string;
  profile_id: number | null;
  name: string;
  format_id: number;
  game_id: number;
  pokemon: {
    species: string;
    item: string;
    ability: string;
    tera_type: string;
    nature: string;
    form: string | null;
    nickname?: string | null;
    gender?: string;
    move1: string | null;
    move2: string | null;
    move3: string | null;
    move4: string | null;
    pokemon_team_id?: number;
  }[];
};

export async function getPokemonTeams(options?: FetchOptions<paths["/pokemon_teams"]["get"]>) {
  const pokemonOptions = {
    ...defaultConfig("getPokemonList"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/pokemon_teams", pokemonOptions);
}

export async function postPokemonTeam(
  validatedTeam: ValidatedPokemon[],
  metadata: PokePasteMetadata,
  options?: FetchOptions<paths["/pokemon_teams"]["post"]>,
) {
  const body: PostPokemonTeamBody = {
    pokepaste_id: metadata.id,
    profile_id: null,
    name: metadata.title,
    format_id: 1,
    game_id: 1,
    pokemon: validatedTeam.map(({ pokemon }) => ({
      nickname: pokemon.name,
      species: pokemon.species,
      item: pokemon.item,
      ability: pokemon.ability,
      tera_type: pokemon.teraType ?? "",
      nature: pokemon.nature,
      form: null,
      move1: pokemon.moves[0] ?? null,
      move2: pokemon.moves[1] ?? null,
      move3: pokemon.moves[2] ?? null,
      move4: pokemon.moves[3] ?? null,
    })),
  };

  const pokemonOptions = {
    ...defaultConfig("postPokemonTeam"),
    ...options,
    body,
  };

  return BattleStadiumApiClient().POST("/pokemon_teams", pokemonOptions);
}
