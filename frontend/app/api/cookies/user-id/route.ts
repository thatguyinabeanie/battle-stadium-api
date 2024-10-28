import { generateSignature, getCookie, setResponseCookies } from "~/lib/auth/cookies";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(_req: NextRequest) {
  const { userId } = await auth();

  const [response, setCookies] = await setResponseCookies();

  if (!setCookies) {
    return NextResponse.json({ error: "Failed to set cookies" }, { status: 500 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Logged in account is required" }, { status: 401 });
  }

  const userIdCookie = await getCookie("userId");

  if (userIdCookie) {
    const [storedUserId, signature] = userIdCookie.split(".");
    const expectedSignature = await generateSignature(storedUserId ?? "");

    if (!storedUserId || !signature || signature !== expectedSignature) {
      const msg = `Signature verification failed for userId cookie. Stored userId: ${storedUserId}, Expected signature: ${expectedSignature}`;

      console.warn(msg); // eslint-disable-line no-console

      return await setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDateValue = await getCookie("userId.expires");

    if (!cookieExpiryDateValue) {
      console.warn("Missing 'userId.expires' cookie."); // eslint-disable-line no-console

      return await setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDate = new Date(cookieExpiryDateValue);

    if (Number.isNaN(cookieExpiryDate.getTime())) {
      console.warn("Invalid date in 'userId.expires' cookie."); // eslint-disable-line no-console

      return await setUserIdCookie(setCookies, userId, response);
    }

    if (cookieExpiryDate > new Date()) {
      return response;
    }
  }

  return await setUserIdCookie(setCookies, userId, response);
}

async function setUserIdCookie(
  setCookies: (name: string, value: string) => Promise<void>,
  userId: string,
  response: NextResponse,
) {
  await setCookies("userId", userId);

  return response;
}
