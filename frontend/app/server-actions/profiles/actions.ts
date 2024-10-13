"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

export async function getProfiles(options?: FetchOptions<paths["/profiles"]["get"]>) {
  const profilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/profiles", profilesOptions);
}
