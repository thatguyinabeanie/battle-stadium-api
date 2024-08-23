import NextAuth from "next-auth";

import authConfig from "@/auth.config";

export const runtime = "edge";
export const { handlers, signIn, signOut, auth } = NextAuth(async () => {
  const { Pool } = await import("pg");
  const PostgresAdapter = await import("@auth/pg-adapter");

  const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return {
    adapter: PostgresAdapter.default(pool),
    pages: {
      signIn: "/login",
      signOut: "/",
    },
    ...authConfig,
  };
});

export const { GET, POST } = handlers;
