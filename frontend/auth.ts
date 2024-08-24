/* eslint-disable no-console */

import type { NextAuthConfig } from "next-auth";

import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";

import { railsSignIn } from "./lib/server-actions/sign-in";

export const providers: Provider[] = [
  GitHub,
  Discord,
  // @ts-expect-error - Twitter v2.0 is not yet supported by the NextAuth library. EXCEPT IT IS!
  Twitter({ version: "2.0" }),
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: { label: "Email", type: "email" },
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials, request) => {
      const loggedInUser = await railsSignIn(credentials, request);

      if (!loggedInUser) {
        // No user found, so this is their first attempt to login
        // meaning this is also the place you could do registration
        throw new Error("User not found.");
      }

      // Transform UserMe to User if necessary
      const user = {
        id: `${loggedInUser.id}`,
        name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
        email: loggedInUser.email,
        pronouns: loggedInUser.pronouns,
        token: loggedInUser.token,
        // Add other properties as needed
      };

      return user;
    },
  }),
];

export const providersMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();

      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

// Notice this is only an object, not a full Auth.js instance
export default {
  providers,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(async (_req) => {
  // if (req) {
  //   //
  //   console.log(req); // do something with the request
  // }
  // const { Pool } = await import("pg");
  // const PostgresAdapter = await import("@auth/pg-adapter");

  // const pool = new Pool({
  //   host: process.env.DATABASE_HOST,
  //   user: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //   max: 20,
  //   idleTimeoutMillis: 30000,
  //   connectionTimeoutMillis: 2000,
  // });

  return {
    providers,
    // adapter: PostgresAdapter.default(pool),
    callbacks: {
      async session({ session, token, user, trigger, newSession }) {
        console.log("callbacks/session - session", session);
        console.log("callbacks/session - token", token);
        console.log("callbacks/session - user", user);
        console.log("callbacks/session - trigger", trigger);
        console.log("callbacks/session - newSession", newSession);

        // @ts-expect-error TODO: fix session type
        session.accessToken = token;

        return session;
      },
      async jwt({ token, user, account, profile, trigger, session }) {
        console.log("callbacks/jwt - session", session);
        console.log("callbacks/jwt - token", token);
        console.log("callbacks/jwt - user", user);
        console.log("callbacks/jwt - trigger", trigger);
        console.log("callbacks/jwt - account", account);
        console.log("callbacks/jwt - profile", profile);

        if (user) {
          // @ts-expect-error TODO: fix token type
          token.accessToken = user.accessToken;
        }

        return token;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
});
