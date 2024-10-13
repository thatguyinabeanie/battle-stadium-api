import { generateSignature, getCookies, useSetResponseCookies } from "@/lib/auth/cookies";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";
const AUTH_SECRET = env.AUTH_SECRET;

export async function POST(req: NextRequest) {
  const { userId } = auth();

  const [response, setCookies] = useSetResponseCookies();

  if (!setCookies) {
    return NextResponse.json({ error: "Failed to set cookies" }, { status: 500 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Logged in account is required" }, { status: 401 });
  }

  if (!AUTH_SECRET) {
    console.error("AUTH_SECRET environment variable is not set."); // eslint-disable-line no-console

    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const cookies = getCookies(req);
  const userIdCookie = cookies["userId"];

  if (userIdCookie) {
    const [storedUserId, signature] = userIdCookie.split(".");
    const expectedSignature = generateSignature(storedUserId ?? "");

    if (!storedUserId || !signature || signature !== expectedSignature) {
      const msg = `Signature verification failed for userId cookie. Stored userId: ${storedUserId}, Expected signature: ${expectedSignature}`;

      console.warn(msg); // eslint-disable-line no-console

      return setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDateValue = cookies["userId.expires"];

    if (!cookieExpiryDateValue) {
      console.warn("Missing 'userId.expires' cookie."); // eslint-disable-line no-console

      return setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDate = new Date(cookieExpiryDateValue);

    if (Number.isNaN(cookieExpiryDate.getTime())) {
      console.warn("Invalid date in 'userId.expires' cookie."); // eslint-disable-line no-console

      return setUserIdCookie(setCookies, userId, response);
    }

    if (cookieExpiryDate > new Date()) {
      return response;
    }
  }

  return setUserIdCookie(setCookies, userId, response);
}

function setUserIdCookie(setCookies: (name: string, value: string) => void, userId: string, response: NextResponse) {
  setCookies("userId", userId);

  return response;
}
