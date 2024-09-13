import { Metadata } from "next";

import BattleStadiumAPI from "@/lib/battle-stadium-api/BattleStadiumAPI";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getMe() {
  return await BattleStadiumAPI(auth()).Users.me({
    next: {
      revalidate: 60 * 60,
      tags: ["users/me"],
    },
  });
}

export default async function Dashboard() {
  const {data: me} = await getMe();

  if (me) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {me.first_name} {me.last_name} </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, please sign in to continue.</p>
    </div>
  );
}
