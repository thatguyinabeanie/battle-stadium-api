import NextAuth from "next-auth";

import { providers } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  return {
    providers,
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/",
    },
  };
});
