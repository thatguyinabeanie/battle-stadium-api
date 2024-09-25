import { generateSignature, getCookies, useSetResponseCookies } from "@/lib/auth/cookies";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET;

const setUserIdCookie = (setCookies: (name: string, value: string) => void, userId: string, response: NextResponse) => {
  setCookies("userId", userId);

  return response;
};

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  const [response, setCookies] = useSetResponseCookies();

  if (!userId) {
    return NextResponse.json({ error: "Logged in user is required" }, { status: 401 });
  }

  if (!AUTH_SECRET) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const cookies = getCookies(req);
  const userIdCookie = cookies["userId"];

  if (userIdCookie) {
    const [storedUserId, signature] = userIdCookie.split(".");
    const expectedSignature = generateSignature(storedUserId ?? "");

    if (signature !== expectedSignature) {
      return setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDateValue = cookies["userId.expires"];

    if (!cookieExpiryDateValue) {
      return setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDate = new Date(cookieExpiryDateValue);

    if (isNaN(cookieExpiryDate.getTime())) {
      return setUserIdCookie(setCookies, userId, response);
    }

    if (cookieExpiryDate > new Date()) {
      return response;
    }
  }

  return setUserIdCookie(setCookies, userId, response);
};
