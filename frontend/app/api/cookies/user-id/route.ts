import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { signCookie, verifyCookie } from "@/lib/auth/cookies";

export async function POST(_req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  signCookie("userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ message: "Cookie set successfully" });
}

export async function GET(_req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const cookies = _req.cookies;
  const userIdCookie = cookies.get("userId");

  if (!userIdCookie) {
    return NextResponse.json({ error: "User ID cookie not found" }, { status: 404 });
  }

  const isValid = verifyCookie("userId", userIdCookie);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid User ID cookie" }, { status: 400 });
  }

  return NextResponse.json({ message: "User ID cookie is valid" });
}
