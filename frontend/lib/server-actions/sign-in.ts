// authActions.ts
"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signInSchema } from "@/lib/zod";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";
import { signIn } from "@/auth";

const SIGNIN_ERROR_URL = "/";

export async function providerSignIn(providerId: string) {
  "use server";
  try {
    await signIn(providerId, { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}

function formDataToObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};

  formData.forEach((value, key) => {
    obj[key] = String(value);
  });

  return obj;
}

export async function credentialsSignIn(formData: FormData) {
  "use server";
  try {
    const formDataObj = formDataToObject(formData);

    await signIn("credentials", {
      ...formDataObj,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}

export async function railsSignIn<T extends string | number | symbol>(
  credentials: Partial<Record<T, unknown>>,
  _request: Request,
) {
  "use server";

  const { email, password, username } = await signInSchema.parseAsync(credentials);

  try {
    return await BattleStadiumAPI().Users.authorize({ email, password, username });
  } catch (error) {
    return null;
  }
}
