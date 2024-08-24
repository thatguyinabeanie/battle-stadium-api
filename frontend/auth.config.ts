import type { NextAuthConfig } from "next-auth";

import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";

import { railsSignIn } from "./lib/server-actions/sign-in";

export const providers: Provider[] = [
  // GitHub({
  //   account (account) {
  //     console.log('GitHub account:', account)
  //     // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens#refreshing-a-user-access-token-with-a-refresh-token
  //     const refresh_token_expires_at =
  //       Math.floor(Date.now() / 1000) + Number(account.refresh_token_expires_in)
  //     const obj = {
  //       access_token: account.access_token,
  //       expires_at: account.expires_at,
  //       refresh_token: account.refresh_token,
  //       refresh_token_expires_at
  //     }
  //     console.log('GitHub account:', obj);
  //     return obj;
  //   }
  // }),
  GitHub,
  Discord,
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
