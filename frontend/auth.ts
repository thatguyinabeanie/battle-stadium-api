import NextAuth from "next-auth";

import { providers } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {

  return {
    providers,
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/",
    },
  };
});
