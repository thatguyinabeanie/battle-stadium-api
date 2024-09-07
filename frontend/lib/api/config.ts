import { Configuration, ConfigurationParameters } from "./generated-api-client";

export const config = (encryptedJwt: string) =>
  new Configuration({
    headers: {
      Authorization: `Bearer ${encryptedJwt}`,
    },
  });

export const defaultConfig = async () => {
  const params: ConfigurationParameters = {
    accessToken: async () => {
      return "";
    },
    // headers,
  };

  return new Configuration(params);
};
