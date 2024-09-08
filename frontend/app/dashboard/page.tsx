import { auth, currentUser } from "@clerk/nextjs/server";

import BattleStadiumAPI from "@/lib/api";

const getMe = async () => {
  "use server";

  const token = await auth().getToken();

  try {
    return await BattleStadiumAPI().Users.me({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting user:", error);

    return null;
  }
};

export default async function Dashboard() {
  const user = await currentUser();

  const me = await getMe();

  if (me) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {me?.firstName}!</p>
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
