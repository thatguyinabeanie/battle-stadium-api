import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export const revalidate = 300;
export const dynamicParams = true;

function getApiClient() {
  return BattleStadiumAPI(auth());
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
  const response = await getApiClient().Tournaments.list();

  return (response?.data?.tournaments ?? []).map((tournament) => ({ tournamentId: tournament.id.toString() }));
}

export default async function Tournament({ params }: Readonly<{ params: { tournamentId: string } }>) {
  const tournament = await getTournament(parseInt(params.tournamentId));

  return (
    <div>
      <h1>{tournament?.name}</h1>
    </div>
  );
}
