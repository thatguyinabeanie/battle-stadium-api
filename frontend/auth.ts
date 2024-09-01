// eslint-disable-file no-console
import * as jose from "jose";
import NextAuth, { NextAuthConfig, Session } from "next-auth";
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
      debug: true,
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
        async session({ session, user }) {
          const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.username ?? "");

          const clonedSession: Session = {
            ...(JSON.parse(JSON.stringify(session)) as Session),
            user: {
              ...session.user,
              ...user,
              name: name ?? undefined,
            },
            jti: session.jti,
          };

          return clonedSession;
        },
      },
    };

    return config;
  } catch (error) {
    throw error;
  }
});
