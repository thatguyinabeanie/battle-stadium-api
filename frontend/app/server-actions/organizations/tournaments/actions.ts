"use server";

import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";
import { paths } from "~/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

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

  return (await BattleStadiumApiClient()).GET("/organizations/{slug}/tournaments", organizationTournamentsOptions);
}
