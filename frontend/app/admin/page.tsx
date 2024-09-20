import { Metadata } from "next";

import { Text } from "@/components/text";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BattleStadiumAPI } from "@/lib/api";
export const metadata: Metadata = {
  title: "Admin",
};

async function getMe () {
  return (await BattleStadiumAPI(auth()).Users.me()).data;
}

export default async function Admin () {
  const authObj = auth();

  if (!!authObj.sessionId) {
    return redirect("/sign-in");
  }

  const me = await getMe();

  if (!me?.admin) {
    return redirect("/");
  }

  return (
    <div>
      <Text tag="h1" variant="header">
        Admin Pages here
      </Text>
    </div>
  );
};
