// authActions.ts
"use server";
import "server-only";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn as handleSignIn } from "@/auth";

const SIGNIN_ERROR_URL = "/";

export async function signIn(providerId: string) {
  try {
    await handleSignIn(providerId, { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}
