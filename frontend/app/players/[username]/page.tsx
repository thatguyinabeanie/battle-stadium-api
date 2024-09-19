import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/api";

function getApiClient(shouldAuth = true) {
  if (shouldAuth) {
    return BattleStadiumAPI(auth());
  }

  return BattleStadiumAPI();
}

async function getPlayer(username: string) {
  const response = await getApiClient().Users.get(username);

  return response.data;
}

export async function generateMetadata({ params }: { params: { username: string } }) {
  const player = await getPlayer(params.username);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage({ params }: { params: { username: string } }) {
  const player = await getPlayer(params.username);

  return (
    <div>
      <h1>{player?.username}</h1>
      <p>
        {player?.first_name} {player?.last_name}
      </p>
    </div>
  );
}
