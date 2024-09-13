import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { tournamentId: string } }) {
  const { data: tournament } = await getTournament(parseInt(params.tournamentId));

  return { title: tournament?.name ?? "Tournament" };
}

async function getTournament(tournamentId: number) {
  return await BattleStadiumAPI.GET("/tournaments/{id}", {
    params: {
      path: {
        id: tournamentId,
      },
    },
  });
}

export async function generateStaticParams() {
  const { data } = await BattleStadiumAPI.GET("/tournaments", {
    next: {
      tags: ["tournaments"],
    },
    params: {
      query: {
        per_page: 200,
        page: 0,
      },
    },
  });

  const tournaments = data?.tournaments;

  return (tournaments ?? []).map((tournament) => ({ tournamentId: tournament.id.toString() }));
}

export default async function Tournament({ params }: { params: { tournamentId: string } }) {
  const { data: tournament } = await getTournament(parseInt(params.tournamentId));

  return (
    <div>
      <h1>{tournament?.name}</h1>
    </div>
  );
}
