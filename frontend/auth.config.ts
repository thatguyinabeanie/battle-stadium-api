import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter"
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

export default {
  providers,
} satisfies NextAuthConfig;
