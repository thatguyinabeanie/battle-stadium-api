import { BattleStadiumAPI } from "@/lib/api";
import { Card, CardBody, Spacer } from "@nextui-org/react";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { tournamentId: string } }) {
  const response = await getTournament(parseInt(params.tournamentId));

  return { title: response.data?.name ?? "Tournament" };
}

async function getTournament(tournamentId: number) {
  return BattleStadiumAPI().Tournaments.get(tournamentId);
}

export async function generateStaticParams() {
  const response = await BattleStadiumAPI().Tournaments.list();

  return (response?.data?.data ?? []).map((tournament) => ({ tournamentId: tournament.id.toString() }));
}

export default async function Tournament({ params }: Readonly<{ params: { tournamentId: string } }>) {
  const response = await getTournament(parseInt(params.tournamentId));

  const tournament = response.data;

  if (!tournament) {
    return <div>404 - Not Found</div>;
  }

  return (
    <div className="w-100 h-100">
      <Card className="bg-transparent h-90 w-90 rounded-3xl" shadow="md">
        <CardBody className="flex flex-row justify-between rounded-3xl">
          <div className="flex flex-col justify-between text-center mx-4">
            <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
          </div>
        </CardBody>
      </Card>

      <Spacer y={4} />
    </div>
  );
}