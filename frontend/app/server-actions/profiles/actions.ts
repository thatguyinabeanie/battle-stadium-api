"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

export async function getUserProfiles(options?: FetchOptions<paths["/user_profiles"]["get"]>) {
  const userProfilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/user_profiles", userProfilesOptions);
}
