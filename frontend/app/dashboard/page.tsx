import { auth } from "@clerk/nextjs/server";

import BattleStadiumAPI from "@/lib/api";

export default async function Dashboard() {
  const authObj = auth();

  if (authObj.userId) {
    const me = await BattleStadiumAPI().Users.me();

    if (me) {
      return (
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {me?.firstName}!</p>
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
