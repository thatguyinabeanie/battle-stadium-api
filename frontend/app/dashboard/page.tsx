import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

import BattleStadiumAPI from "@/lib/battle-stadium-api/BattleStadiumAPI";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getMe() {
  return await BattleStadiumAPI.GET("/users/me", {
    next: { revalidate: 300 },
  });
}

export default async function Dashboard() {
  const authObj = auth();

  if (authObj.userId) {
    const { data: me, error } = await getMe();

    if (me) {
      return (
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {me?.first_name}!</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, please sign in to continue.</p>
    </div>
  );
}
