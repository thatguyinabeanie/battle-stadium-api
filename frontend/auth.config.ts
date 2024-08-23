import GitHub from "next-auth/providers/github";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import BattleStadiumAPI from "./lib/battle-stadium-api";
import { signInSchema } from "./lib/zod";
import { UserMe } from "./lib/api";

const providers = [
  GitHub,
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      username: {},
      password: {},
    },
    authorize: async (credentials, request) => {
      const { email, password } = await signInSchema.parseAsync(credentials);

      // logic to salt and hash password
      // const pwHash = saltAndHashPassword(credentials.password)

      const loggedInUser = await BattleStadiumAPI.Authentication.login({
        userLoginRequest: {
          email,
          password,
        },
      });

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
