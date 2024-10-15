"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

export const runtime = "edge";

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
