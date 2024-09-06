import { auth } from "@/lib/auth";
import { signJWT } from "@/lib/auth/jwt";

import { Configuration, ConfigurationParameters, HTTPHeaders } from "./generated-api-client";

export const config = (encryptedJwt: string) =>
  new Configuration({
    headers: {
      Authorization: `Bearer ${encryptedJwt}`,
    },
  });

export const defaultConfig = async () => {
  const environment = process.env.NODE_ENV || "development";
  const session = environment !== "test" ? await auth() : null;
  const headers: HTTPHeaders = session
    ? {
        Authorization: `Bearer ${await signJWT({
          session: session,
        })}`,
      }
    : {};

  const params: ConfigurationParameters = {
    accessToken: async () => {
      return session?.accessToken ?? "";
    },
    headers,
  };

  return new Configuration(params);
};
