// auth/signOutAction.ts
"use server";

import { redirect } from "next/navigation";

import { signOut as handleSignOut} from "@/auth";

export async function signOut() {
  await handleSignOut();
  redirect("/");
}
