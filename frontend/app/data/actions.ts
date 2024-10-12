"use server";

import { BattleStadiumApiClient } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { PokePasteMetadata, ValidatedPokemon } from "@/lib/pokemon/common";
import { auth } from "@clerk/nextjs/server";
import { FetchOptions } from "openapi-fetch";

const DEFAULT_CACHE_TIMEOUT: number = 300;

function defaultConfig(tag: string, revalidate?: number) {
  return {
    next: { tags: [tag], revalidate: revalidate ?? DEFAULT_CACHE_TIMEOUT },
  };
}

export async function getMe(options?: FetchOptions<paths["/users/me"]["get"]>) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userMeOptions = { ...defaultConfig(`getMe(${userId})`), ...options };

  return BattleStadiumApiClient().GET("/users/me", userMeOptions);
}

export async function getTournament(
  tournament_id: number,
  options?: FetchOptions<paths["/tournaments/{tournament_id}"]["get"]>,
) {
  const tournamentOptions = {
    ...defaultConfig(`getTournament(${tournament_id})`),
    ...options,
    params: { path: { tournament_id } },
  };

  return BattleStadiumApiClient().GET("/tournaments/{tournament_id}", tournamentOptions);
}

export async function getTournaments(
  page: number = 0,
  per_page: number = 20,
  options?: FetchOptions<paths["/tournaments"]["get"]>,
) {
  const tournamentsOptions = {
    ...defaultConfig("getTournaments"),
    ...options,
    params: { query: { page, per_page } },
  };

  const skipClerkAuth = true;

  return BattleStadiumApiClient(skipClerkAuth).GET("/tournaments", tournamentsOptions);
}

export async function getOrganizations(options?: FetchOptions<paths["/organizations"]["get"]>) {
  const organizationsOptions = {
    ...defaultConfig("getOrganizations"),
    ...options,
    params: {
      query: {
        page: (options?.params?.query?.page as number) || 0,
        per_page: (options?.params?.query?.per_page as number) || 20,
      },
    },
  };
  const skipClerkAuth = true;

  return BattleStadiumApiClient(skipClerkAuth).GET("/organizations", organizationsOptions);
}

export async function getOrganization(slug: string, options?: FetchOptions<paths["/organizations/{slug}"]["get"]>) {
  const organizationOptions = {
    ...defaultConfig(`getOrganization(${slug})`),
    ...options,
    params: { path: { slug } },
  };

  return BattleStadiumApiClient().GET("/organizations/{slug}", organizationOptions);
}

export async function getOrganizationTournaments(
  slug: string,
  options?: FetchOptions<paths["/organizations/{slug}/tournaments"]["get"]>,
) {
  const organizationTournamentsOptions = {
    ...defaultConfig(`getOrganizationTournaments(${slug})`),
    ...options,
    params: {
      path: { slug },
      ...options?.params,
    },
  };

  return BattleStadiumApiClient().GET("/organizations/{slug}/tournaments", organizationTournamentsOptions);
}

export async function getUser(username: string, options?: FetchOptions<paths["/users/{username}"]["get"]>) {
  const userOptions = {
    ...defaultConfig(`getUser-${username}`),
    ...options,
    params: { path: { username } },
  };

  return BattleStadiumApiClient().GET("/users/{username}", userOptions);
}

export async function getUsers(options?: FetchOptions<paths["/users"]["get"]>) {
  const usersOptions = {
    ...defaultConfig("listUsers"),
    ...options,
  };
  const skipClerkAuth = true;

  return BattleStadiumApiClient(skipClerkAuth).GET("/users", usersOptions);
}

export async function getUserProfiles(options?: FetchOptions<paths["/user_profiles"]["get"]>) {
  const userProfilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/user_profiles", userProfilesOptions);
}

export async function getPokemonTeams(options?: FetchOptions<paths["/pokemon_teams"]["get"]>) {
  const pokemonOptions = {
    ...defaultConfig("getPokemonList"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/pokemon_teams", pokemonOptions);
}

type PostPokemonTeamBody = {
  pokepaste_id?: string;
  user_profile_id: number | null;
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

export async function postPokemonTeam(
  validatedTeam: ValidatedPokemon[],
  metadata: PokePasteMetadata,
  options?: FetchOptions<paths["/pokemon_teams"]["post"]>,
) {
  const body: PostPokemonTeamBody = {
    pokepaste_id: metadata.id,
    user_profile_id: null,
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
