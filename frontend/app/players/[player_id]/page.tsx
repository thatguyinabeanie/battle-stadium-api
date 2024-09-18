import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

function getApiClient(shouldAuth = true) {
  if (shouldAuth) {
    return BattleStadiumAPI(auth());
  }

  return BattleStadiumAPI();
}

async function getPlayer(player_id: string) {
  const response = await getApiClient().Users.get(player_id);

  return response.data;
}

export async function generateMetadata({ params }: { params: { player_id: string } }) {
  const player = await getPlayer(params.player_id);

  return { title: player?.username ?? "Player" };
}

export default async function PlayerProfilePage({ params }: { params: { player_id: string } }) {
  const player = await getPlayer(params.player_id);

  return (
    <div>
      <h1>{player?.username}</h1>
      <p>
        {player?.first_name} {player?.last_name}
      </p>
    </div>
  );
}
