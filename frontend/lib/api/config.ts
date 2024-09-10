import { auth } from "@clerk/nextjs/server";
import { Configuration, ConfigurationParameters } from "./generated-api-client";

export const CACHE_TIMEOUT: number = 300;

export * from "./generated-api-client";

export const defaultConfig = async (configOverride?: Configuration) => {
  "use server";

  const { getToken } = auth();
  const sessionToken = await getToken();

  const configParams: ConfigurationParameters = {
    headers: {
      Authorization: sessionToken ? `Bearer ${sessionToken}` : "Bearer",
    },
    ...configOverride,
  };

  return new Configuration(configParams);
};

