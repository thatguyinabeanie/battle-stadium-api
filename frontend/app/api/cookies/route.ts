import { auth } from "@clerk/nextjs/server";
import cookie from "cookie";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET;

export const POST = async (_req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Logged in user is required" }, { status: 401 });
  }

  if (!AUTH_SECRET) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(userId).digest("hex");
  const signedUserId = `${userId}.${signature}`;

  const response = NextResponse.json({ message: "User ID cookie set successfully" });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize("userId", signedUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }),
  );

  return response;
};
