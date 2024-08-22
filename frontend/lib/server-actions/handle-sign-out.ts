// auth/signOutAction.ts
"use server";

import { redirect } from "next/navigation";

import { signOut } from "@/auth";

export async function handleSignOut() {
  await signOut();
  redirect("/");
}
