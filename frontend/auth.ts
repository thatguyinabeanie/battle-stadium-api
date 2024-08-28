import NextAuth from "next-auth";
import { neon } from "@neondatabase/serverless";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/neon-http";

import { providers } from "./auth.config";

import { account, session, users, verificationToken, authenticators } from "@/drizzle/schema";

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  try {
    const pool = neon(process.env.POSTGRES_CONNECTION_STRING as string);
    const drizzleAdapter = DrizzleAdapter(drizzle(pool), {
      usersTable: users,
      accountsTable: account,
      sessionsTable: session,
      verificationTokensTable: verificationToken,
      authenticatorsTable: authenticators,
    });

    return {
      providers,
      adapter: drizzleAdapter,
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/",
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error initializing NextAuth adapter:", error);
    throw error;
  }
});
