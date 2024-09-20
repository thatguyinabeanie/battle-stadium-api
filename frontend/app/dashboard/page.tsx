import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/api";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getMe() {
  return (await BattleStadiumAPI(auth()).Users.me()).data;
}

export default async function Dashboard() {
  const me = await getMe();

  if (me) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>
          Welcome, {me.first_name} {me.last_name}{" "}
        </p>
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
