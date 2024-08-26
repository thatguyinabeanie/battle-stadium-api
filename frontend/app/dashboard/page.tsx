// import { auth } from "@/auth";
import BattleStadiumAPI from "@/lib/battle-stadium-api";

export default async function Dashboard() {
  // const session = await auth();

  // if (!session) {
  //   return <div>Not signed in</div>;
  // }

  try {
    const me = await BattleStadiumAPI.Users.me();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {me?.firstName}</p>
      </div>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
