import { NextRequest } from "next/server";
import NextAuth from "next-auth";

import authConfig from "@/auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(_req: NextRequest) {
  // Your custom middleware logic goes here
  // console.log('auth-middleware', req);
});
