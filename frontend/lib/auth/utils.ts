import { NextResponse } from "next/server";

/**
 * Returns a Response object with a JSON body
 */
export function jsonResponse(status: number, data: unknown, init?: ResponseInit) {
  return new NextResponse(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}
