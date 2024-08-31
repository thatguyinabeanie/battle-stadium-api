// eslint-disable-file no-console
import * as jose from "jose";
import NextAuth, { NextAuthConfig } from "next-auth";
import { EncryptJWT, jwtDecrypt } from "jose";
import { JWTEncodeParams } from "@auth/core/jwt";

import { providers } from "./auth.config";
import { Configuration } from "./lib/api/runtime";

import { RailsAdapter } from "@/lib/auth/rails-api-adapter";
import BattleStadiumAPI from "@/lib/battle-stadium-api";

const config = async (): Promise<Configuration> => {
  const jwt = new jose.SignJWT({ username: "battlestadiumbot" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("8h")
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

  return new Configuration({
    headers: {
      Authorization: `Bearer ${await jwt}`,
    },
  });
};

const decrypt = async (token: string, secret: string) => {
  const encoder = new TextEncoder();

  return (
    await jwtDecrypt(token, encoder.encode(secret), {
      clockTolerance: 15,
    })
  ).payload;
};

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const apiClient = BattleStadiumAPI(await config());

  try {
    const config: NextAuthConfig = {
      providers,
      adapter: RailsAdapter(apiClient),
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/",
      },
      jwt: {
        encode: async ({ secret, token }: JWTEncodeParams) => {
          console.log("jwt encode", "secret", secret, "token", token);
          const encoder = new TextEncoder();

          if (typeof secret === "string") {
            return await new EncryptJWT(token)
              .setProtectedHeader({ alg: "dir", enc: "A256CBC-HS512" })
              .encrypt(encoder.encode(secret));
          } else if (secret instanceof Array && secret.length > 0) {
            return await new EncryptJWT(token)
              .setProtectedHeader({ alg: "dir", enc: "A256CBC-HS512" })
              .encrypt(encoder.encode(secret[0]));
          }

          throw new Error("Invalid secret provided");
        },
        decode: async ({ secret, token }) => {
          console.log("jwt decode", "secret", secret, "token", token);

          if (!token) {
            throw new Error("No token provided");
          }

          if (typeof secret === "string") {
            return await decrypt(token, secret);
          } else if (secret instanceof Array && secret.length > 0 && secret[0]) {
            return await decrypt(token, secret[0]);
          }

          throw new Error("Invalid secret provided");
        },
      },
      callbacks: {
        async jwt({ token, user, account, profile, session }) {
          console.log("jwt callback", token);
          console.log("jwt callback user", user);
          console.log("jwt callback account", account);
          console.log("jwt callback profile", profile);
          console.log("jwt callback session", session);

          if (user) {
            token = {
              ...token,
              ...user,
              accessToken: user.token,
            };
          }

          return token;
        },
        async session({ session, token, user, trigger, newSession }) {
          console.log("session callback", session);
          console.log("session callback token", token);
          console.log("session callback user", user);
          console.log("session callback trigger", trigger);
          console.log("session callback newSession", newSession);

          // You might need to customize this based on your token structure
          session.user = {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
          };

          session.accessToken = (user.token || token.accessToken || session.sessionToken) ?? "";

          return session;
        },
      },
    };

    return config;
  } catch (error) {
    console.error("Error initializing NextAuth adapter:", error);
    throw error;
  }
});
