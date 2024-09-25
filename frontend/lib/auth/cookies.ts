import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import crypto from "crypto";
const AUTH_SECRET = process.env.AUTH_SECRET;

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
    const signedValue = `${value}.${generateSignature(value)}`;

    response.headers.set("Set-Cookie", cookie.serialize(key, signedValue, defaultCookieOptions));

    const expires = new Date(Date.now() + maxAge).toUTCString();

    response.headers.append("Set-Cookie", cookie.serialize(`${key}.expires`, expires, defaultCookieOptions));
  }

  return [response, setCookies] as const;
}

export function generateSignature(value: string | number) {
  if (!AUTH_SECRET) {
    throw new Error("Server configuration error");
  }

  return crypto.createHmac("sha256", AUTH_SECRET).update(`${value}`).digest("hex");
}

export function getCookies(req: NextRequest) {
  return cookie.parse(req.headers.get("cookie") ?? "");
}
