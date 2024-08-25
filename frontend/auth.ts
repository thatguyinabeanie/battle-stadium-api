/* eslint-disable no-console */
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { drizzle } from "drizzle-orm/postgres-js"

import { providers } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth(async (_req) => {
  const {default: postgres} = await import("postgres");
  const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
  const db = drizzle(postgres(connectionString));
  return {
    providers,
    adapter: DrizzleAdapter(db),
    callbacks: {
      async session({ session }) {
        return session;
      },

      // async jwt ({ token, user, account, profile, trigger, session }) {
      async jwt({ token }) {
        return token;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
});
