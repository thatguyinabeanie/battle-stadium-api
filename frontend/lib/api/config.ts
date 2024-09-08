import { getVercelOidcToken } from "@vercel/functions/oidc";

import { Configuration, ConfigurationParameters } from "./generated-api-client";

export const defaultConfig = async () => {
  "use server";
  const params: ConfigurationParameters = {
    headers: {
      Authorization: `Bearer ${await getVercelOidcToken()}`,
    },
  };

  return new Configuration(params);
};
