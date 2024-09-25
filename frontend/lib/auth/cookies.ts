import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import crypto from "node:crypto";
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set.");
}

const maxAge = 60 * 60 * 24 * 1000; // 1 day in milliseconds
const defaultCookieOptions: cookie.CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge,
};

export function useSetResponseCookies() {
  const response = NextResponse.json({ message: "Cookie set successfully" });

  function setCookies(key: string, value: string | number) {
    const encodedValue = encodeURIComponent(`${value}`);
    const signedEncodedValue = `${encodedValue}.${generateSignature(encodedValue)}`;

    response.headers.set("Set-Cookie", cookie.serialize(key, signedEncodedValue, defaultCookieOptions));

    const expires = new Date(Date.now() + maxAge).toUTCString();

    response.headers.append("Set-Cookie", cookie.serialize(`${key}.expires`, expires, defaultCookieOptions));
  }

  return [response, setCookies] as const;
}

export function generateSignature(value: string | number) {
  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET is missing!");
  }

  return crypto.createHmac("sha256", AUTH_SECRET).update(`${value}`).digest("hex");
}

export function getCookies(req: NextRequest): { [key: string]: string } {
  return cookie.parse(req.headers.get("cookie") ?? "");
}
