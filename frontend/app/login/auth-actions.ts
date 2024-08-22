// authActions.ts
"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const SIGNIN_ERROR_URL = "/";

export async function handleSignIn (providerId: string) {
  try {
    await signIn(providerId, {redirectTo: "/dashboard"});
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}
