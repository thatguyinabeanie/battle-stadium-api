"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

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

export async function postTournamentRegistration(
  registration: {
    tournament_id: number;
    in_game_name: string;
    profile_id: number;
    pokemon_team_id?: number;
  },
  options?: FetchOptions<paths["/tournaments/{tournament_id}/players"]["post"]>,
) {
  const { tournament_id, in_game_name, profile_id, pokemon_team_id } = registration;

  const registrationOptions = {
    ...defaultConfig(`postTournamentRegistration(${tournament_id})`),
    ...options,
    params: {
      path: { tournament_id },
      query: {
        pokemon_team_id,
        in_game_name,
        profile_id,
      },
    },
  };

  await BattleStadiumApiClient().POST("/tournaments/{tournament_id}/players", registrationOptions);
}
