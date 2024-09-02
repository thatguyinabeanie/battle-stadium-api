// auth/signOutAction.ts
"use server";

import { signOut as handleSignOut } from "@/lib/auth";

export async function signOut() {
  "use server";
  await handleSignOut({ redirectTo: "/" });
}
