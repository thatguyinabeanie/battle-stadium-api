import NextAuth from "next-auth";

import { providers } from "./auth.config";

const InitDrizzleAdapter = async () => {
  const { neon } = await import("@neondatabase/serverless");

  const { DrizzleAdapter } = await import("@auth/drizzle-adapter");
  const { drizzle } = await import("drizzle-orm/neon-http");
  const pool = neon(process.env.POSTGRES_CONNECTION_STRING as string);
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
  return {
    providers,
    adapter: await InitDrizzleAdapter(),
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/",
    },
  };
});
