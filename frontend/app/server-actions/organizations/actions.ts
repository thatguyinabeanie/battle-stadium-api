"use server";

import { BattleStadiumApiClient, defaultConfig } from "@/lib/api";
import { paths } from "@/lib/api/openapi-v1";
import { FetchOptions } from "openapi-fetch";

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

  return (await BattleStadiumApiClient(skipClerkAuth)).GET("/organizations", organizationsOptions);
}

export async function getOrganization(slug: string, options?: FetchOptions<paths["/organizations/{slug}"]["get"]>) {
  const organizationOptions = {
    ...defaultConfig(`getOrganization(${slug})`),
    ...options,
    params: { path: { slug } },
  };

  return (await BattleStadiumApiClient()).GET("/organizations/{slug}", organizationOptions);
}
