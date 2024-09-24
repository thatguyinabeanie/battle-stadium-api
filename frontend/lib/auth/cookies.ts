// utils/cookies.ts
import Cookies from "js-cookie";
import crypto from "crypto";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const SECRET_KEY = process.env.AUTH_SECRET;

export function signCookie(name: string, value: string, options: Cookies.CookieAttributes = {}) {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not set");
  }
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(value).digest("hex");
  const signedValue = `${value}.${signature}`;

  Cookies.set(name, signedValue, options);
}

export function verifyCookie(name: string, expectedCookie?: RequestCookie): string | null {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is not set");
  }

  const cookie = Cookies.get(name);

  if (!cookie) return null;

  const [value, signature] = cookie.split(".");

  if (!value) {
    throw new Error("Cookie value is not set");
  }

  const expectedSignature = crypto.createHmac("sha256", SECRET_KEY).update(value).digest("hex");

  const checkSignature = signature === expectedSignature;
  const checkValue = expectedCookie?.value === value;

  if (expectedCookie !== undefined) {
    return checkSignature && checkValue ? value : null;
  }

  return checkSignature ? value : null;
}
