import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import crypto from "node:crypto";
const AUTH_SECRET = env.AUTH_SECRET;

import { env } from "@/env.mjs";

if (!AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set.");
}

function getCookieDomain() {
  if (env.NODE_ENV === "production") {
    return env.COOKIE_DOMAIN;
  }

  return "localhost";
}

const maxAge = 60 * 60 * 24; // 1 day in seconds
const defaultCookieOptions: cookie.CookieSerializeOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "none",
  domain: getCookieDomain(),
  path: "/",
  maxAge,
};

export function useSetResponseCookies(): readonly [NextResponse, (key: string, value: string | number) => void] {
  const response = NextResponse.json({ message: "Cookie set successfully" });

  function setCookies(key: string, value: string | number) {
    const encodedValue = encodeURIComponent(`${value}`).replace(/\./g, "%2E");
    const signedEncodedValue = `${encodedValue}.${generateSignature(encodedValue)}`;

    response.headers.set("Set-Cookie", cookie.serialize(key, signedEncodedValue, defaultCookieOptions));

    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

    response.headers.append("Set-Cookie", cookie.serialize(`${key}.expires`, expires, defaultCookieOptions));
  }

  return [response, setCookies];
}

export function generateSignature(value: string | number) {
  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not set.");
  }

  return crypto.createHmac("sha256", AUTH_SECRET).update(`${value}`).digest("hex");
}

export function getCookies(req: NextRequest): { [key: string]: string } {
  return cookie.parse(req.headers.get("cookie") ?? "");
}
