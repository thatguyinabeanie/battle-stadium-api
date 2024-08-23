"use server";
import { signInSchema } from "@/lib/zod";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export async function railsSignIn<T extends string | number | symbol>(credentials: Partial<Record<T, unknown>>, _request: Request) {
  // Logic to sign in a user

  const { email, password } = await signInSchema.parseAsync(credentials);

  // logic to salt and hash password
  // const pwHash = saltAndHashPassword(credentials.password)

  const loggedInUser = await BattleStadiumAPI.Authentication.login({
    userLoginRequest: {
      email,
      password,
    },
  });

  return loggedInUser;
}
