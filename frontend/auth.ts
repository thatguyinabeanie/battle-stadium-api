// eslint-disable-file no-console
import NextAuth, { type DefaultSession } from "next-auth";
import { neon } from "@neondatabase/serverless";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { drizzle } from "drizzle-orm/neon-http";
import { providers } from "./auth.config";

import { account, session, users, verificationToken, authenticators } from "@/drizzle/schema";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
    token: string;
  }
}
const connectionString = "postgres://postgres:postgres@postgres:5432/fuecoco-db-dev";

const pool = neon(connectionString);

// const drizzleAdapter = DrizzleAdapter(drizzle(pool));
const drizzleAdapter = DrizzleAdapter(drizzle(pool), {
  usersTable: users,
  accountsTable: account,
  sessionsTable: session,
  verificationTokensTable: verificationToken,
  authenticatorsTable: authenticators,
});



export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  try {
    return {
      providers,
      adapter: drizzleAdapter,
      // adapter: PrismaAdapter(prisma),
      strategy: "database",
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/",
      },
      callbacks: {
        async jwt({ token, user, account, profile, trigger, ...rest }) {
          console.log("jwt", token);
          console.log("jwt user", user);
          console.log("jwt account", account);
          console.log("jwt profile", profile);
          console.log("jwt trigger", trigger);
          console.log("jwt rest", rest);

          return token;
        },
        async session({ session, user, token, trigger, ...rest }) {
          console.log("session", session);
          console.log("session user", user);
          console.log("session token", token);
          console.log("session trigger", trigger);
          console.log("session rest", rest);

          return session
        },
      },
    };
  } catch (error) {

    console.error("Error initializing NextAuth adapter:", error);
    throw error;
  }
});
