import NextAuth from "next-auth";

import { providers } from "./auth.config";
import { type Adapter } from "@auth/core/adapters"
// 2. A function that returns an object. Official adapters use this pattern.

export function BattleStadiumApiAdapter (config?: any): Adapter {
  // Instantiate a client/ORM here with the provided config, or pass it in as a parameter.
  // Usually, you might already have a client instance elsewhere in your application,
  // so you should only create a new instance if you need to or you don't have one.

  return {
    // implement the adapter methods
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  // adapter: BattleStadiumApiAdapter(),
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/",
  },
});
