/* eslint-disable no-console */

import type { NextAuthConfig } from "next-auth";

import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import Twitch from "next-auth/providers/twitch";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";

import { railsSignIn } from "./lib/server-actions/sign-in";

const ProvidersIconMap: Record<string, string> = {
  github: "logos:github-icon",
  discord: "logos:discord-icon",
  twitter: "logos:twitter",
  twitch: "logos:twitch",
};

export const providers: Provider[] = [
  GitHub,
  Discord,
  Twitch,
  Twitter({
    // @ts-expect-error - adds Twitter v2.0 support
    version: "2.0",
  }),
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

      return {
        id: providerData.id,
        name: providerData.name,
        icon: ProvidersIconMap[providerData.name.toLowerCase()],
      };
    } else {
      return {
        id: provider.id,
        name: provider.name,
        icon: ProvidersIconMap[provider.name.toLowerCase()],
      };
    }
  })
  .filter((provider) => provider.id !== "credentials");

// Notice this is only an object, not a full Auth.js instance
export default {
  providers,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(async (_req) => {
  return {
    providers,
    // adapter: PostgresAdapter.default(pool),
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
