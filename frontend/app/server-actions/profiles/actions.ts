"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { revalidateTag } from "next/cache";
import { FetchOptions } from "openapi-fetch";

export async function getProfiles(options?: FetchOptions<paths["/profiles"]["get"]>) {
  const profilesOptions = {
    ...defaultConfig("getPlayerProfiles"),
    ...options,
  };

  return BattleStadiumApiClient().GET("/profiles", profilesOptions);
}

export async function getProfilesByAccountId(id: number, options?: FetchOptions<paths["/profiles"]["get"]>) {
  const profileOptions = {
    ...defaultConfig(`getPlayerProfileByAccountId-${id}`),
    ...options,
    query: {
      id,
    },
  };

  return BattleStadiumApiClient().GET("/profiles", profileOptions);
}

export async function createProfile(
  username: string,
  accountId: number,
  options?: FetchOptions<paths["/profiles"]["post"]>,
) {
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

  const resp = (await BattleStadiumApiClient().POST("/profiles", profileOptions)).data;

  revalidateTag(`getPlayerProfileByAccountId-${accountId}`);

  return { success: true, resp };
}
