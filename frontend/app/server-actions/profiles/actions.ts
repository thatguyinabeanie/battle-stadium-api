"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

export const runtime = "edge";

export async function getProfiles(options?: FetchOptions<paths["/profiles"]["get"]>) {
  const profilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/profiles", profilesOptions);
}

export async function getProfilesByAccountId(id: number, options?: FetchOptions<paths["/profiles"]["get"]>) {
  const profileOptions = {
    ...defaultConfig("getPlayerProfile"),
    ...options,
    query: {
      id,
    },
  };

  return BattleStadiumApiClient().GET("/profiles", profileOptions);
}

export async function createProfile(username: string, options?: FetchOptions<paths["/profiles"]["post"]>) {
  const profileOptions = {
    ...defaultConfig("postPlayerProfile"),
    params: {
      query: {
        user_name: username,
      },
      header: options?.params?.header,
      path: undefined,
      cookie: undefined,
    },
  };

  return BattleStadiumApiClient().POST("/profiles", profileOptions);
}
