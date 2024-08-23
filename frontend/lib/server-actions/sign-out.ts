// auth/signOutAction.ts
"use server";

import { redirect } from "next/navigation";

import { signOut as handleSignOut } from "@/app/api/auth/[...nextauth]/route";

export async function signOut() {
  await handleSignOut();
  redirect("/");
}
