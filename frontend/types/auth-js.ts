import { DefaultSession } from "@auth/core/types";
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
    token: JWT;
    accessToken: JWT["accessToken"];
    // account: Account;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface UserBase {
    username?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    pronouns?: string | null;
    name?: string | null;
    token?: string;
  }

  interface User extends UserBase {
    password?: string;
    passwordConfirmation?: string;
  }

  interface AdapterUser extends UserBase {
    id: string;
    emailVerified: Date | null;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
  }
}
