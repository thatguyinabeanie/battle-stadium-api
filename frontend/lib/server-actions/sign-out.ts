// auth/signOutAction.ts
"use server";

import { signOut as handleSignOut } from "@/auth";

export async function signOut() {
  await handleSignOut({ redirectTo: "/" });
}
