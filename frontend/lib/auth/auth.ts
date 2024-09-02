// eslint-disable-file no-console
import NextAuth, { NextAuthConfig } from "next-auth";
import { EncryptJWT, jwtDecrypt } from "jose";
import { JWTEncodeParams } from "@auth/core/jwt";

import { providers } from "./authjs-providers-config";

import { decrypt, RailsAdapter, signJWT } from "@/lib/auth";
import BattleStadiumAPI, { config } from "@/lib/api";

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const defaultWT = await signJWT({
    username: "battlestadiumbot",
  });

  const apiClient = BattleStadiumAPI(config(defaultWT));

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
          const encoder = new TextEncoder();

          const encryptedJwt = new EncryptJWT(token)
            .setProtectedHeader({ alg: "dir", enc: "A256CBC-HS512" })
            .setIssuedAt()
            .setIssuer("nextjs-auth-service")
            .setAudience("rails-api-service");

          if (typeof secret === "string") {
            return await encryptedJwt.encrypt(encoder.encode(secret));
          } else if (secret instanceof Array && secret.length > 0) {
            return await encryptedJwt.encrypt(encoder.encode(secret[0]));
          }

          throw new Error("Invalid secret provided");
        },
        decode: async ({ secret, token }) => {
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
        async jwt({ token, user, account }) {
          if (user) {
            token = {
              ...token,
              ...user,
              accessToken: user.token,
            };
          }

          if (account) {
            if (account?.provider === "Github") {
              return { ...token, accessToken: account.access_token };
            }
          }

          return token;
        },
        async session({ session, user, token }) {
          return {
            ...session,
            user,
            token,
          };
        },
      },
    };

    return config;
  } catch (error) {
    throw error;
  }
});
