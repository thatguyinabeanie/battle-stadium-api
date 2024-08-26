/* eslint-disable no-console */
import NextAuth, { NextAuthConfig } from "next-auth";
import { providers } from "./auth.config";
import { Awaitable } from "@auth/core/types";

export const { handlers, signIn, signOut, auth } = NextAuth(async (_req) => {
  const config: Awaitable<NextAuthConfig> = {
    providers,
    callbacks: {
      async session ({ session }) {
        return session;
      },
      async jwt ({ token }) {
        return token;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
  return config;
});
