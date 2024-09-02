import type { NextAuthConfig } from "next-auth";

import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import Twitch from "next-auth/providers/twitch";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";

import { railsSignIn } from "../server-actions/sign-in";

export const providers: Provider[] = [
  GitHub({
    allowDangerousEmailAccountLinking: true,
  }),
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
        throw new Error("authorize - User not found.");
      }

      // Transform UserMe to User if necessary
      const user = {
        id: `${loggedInUser.id}`,
        name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
        email: loggedInUser.email,
        pronouns: loggedInUser.pronouns,
        username: loggedInUser.username,
        // Add other properties as needed
      };

      return user;
    },
  }),
];

// TODO: pick better icons
const ProvidersIconMap: Record<string, string> = {
  github: "logos:github",
  discord: "logos:discord",
  twitter: "logos:twitter",
};

export const providersMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();

      return {
        id: providerData.id,
        name: providerData.name,
        icon: ProvidersIconMap[providerData.name.toLowerCase()] as string,
      };
    } else {
      return { id: provider.id, name: provider.name, icon: ProvidersIconMap[provider.name.toLowerCase()] as string };
    }
  })
  .filter((provider) => provider.id !== "credentials");

// Notice this is only an object, not a full Auth.js instance
export default {
  providers,
} satisfies NextAuthConfig;
