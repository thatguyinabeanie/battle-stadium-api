import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export const revalidate = 300;
export const dynamicParams = true;

function getApiClient(shouldAuth = true) {
  if (shouldAuth) {
    return BattleStadiumAPI(auth());
  }

  return BattleStadiumAPI();
}

export async function generateMetadata({ params }: { params: { tournamentId: string } }) {
  const tournament = await getTournament(parseInt(params.tournamentId));

  return { title: tournament?.name ?? "Tournament" };
}

async function getTournament(tournamentId: number) {
  const response = await getApiClient().Tournaments.get(tournamentId);

  return response.data;
}

export async function generateStaticParams() {
  const response = await getApiClient(false).Tournaments.list();

  return (response?.data?.data ?? []).map((tournament) => ({ tournamentId: tournament.id.toString() }));
}

export default async function Tournament({ params }: Readonly<{ params: { tournamentId: string } }>) {
  const tournament = await getTournament(parseInt(params.tournamentId));

  return (
    <div>
      <h1>{tournament?.name}</h1>
    </div>
  );
}
