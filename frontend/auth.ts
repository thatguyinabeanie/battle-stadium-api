import NextAuth from "next-auth";
// import { drizzle } from "drizzle-orm/node-postgres";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { providers } from "./auth.config";

import { account, session, users, verificationToken, authenticators } from "@/drizzle/schema";

const InitDrizzleAdapter = () => {
  const connectionString = `postgres://postgres:postgres@${process?.env?.BACKEND_HOST ?? "localhost"}:5432/fuecoco-db-dev`;
  const pool = postgres(connectionString);
  const db = drizzle(pool);

  return DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
    authenticatorsTable: authenticators,
  });
};

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  if (typeof window === "undefined") {
    return {
      providers,
      pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/",
      },
    };
  }

  return {
    providers,
    adapter: InitDrizzleAdapter(),
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/",
    },
  };
});
