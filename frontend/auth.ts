// eslint-disable-file no-console
import * as jose from "jose";
import NextAuth from "next-auth";

import { providers } from "./auth.config";
import { RailsAdapter } from "@/lib/auth/rails-api-adapter";
import BattleStadiumAPI from "@/lib/battle-stadium-api";
import { Configuration } from "./lib/api/runtime";


export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const config = (): Configuration => {
    const jwt = new jose.SignJWT({ username: 'battlestadiumbot' })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("nextjs-auth-service")
      .setAudience("rails-api-service")
      .setExpirationTime("8h")
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

    return new Configuration({
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
  };

  const apiClient = await BattleStadiumAPI(config());
  try {
    return {
      providers,
      adapter: RailsAdapter(apiClient),
      secret: process.env.AUTH_SECRET,
      pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/",
      },
      callbacks: {
        async jwt({ token }) {
          console.log('jwt callback', token);

          return token;
        },
        async session({ session }) {
          console.log('session callback', session);
          return session;
        },
      },
    };
  } catch (error) {
    // console.error("Error initializing NextAuth adapter:", error);
    throw error;
  }
});
