import NextAuth from "next-auth";

import { providers } from "./auth.config";

const InitDrizzleAdapter = async () => {
  const connectionString = `postgres://postgres:postgres@${process?.env?.BACKEND_HOST ?? "localhost"}:5432/fuecoco-db-dev`;

  const {neon} = await import("@neondatabase/serverless");

  const { DrizzleAdapter } = await import("@auth/drizzle-adapter");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const pool = neon(connectionString);
  const db = drizzle(pool);

  const { account, session, users, verificationToken, authenticators } = await import("@/drizzle/schema");


  return DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
    authenticatorsTable: authenticators,
  });
};

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {

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
    adapter: await InitDrizzleAdapter(),
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/",
    },
  };
});
