import { getTournament, getTournaments } from "@/app/data/actions";
import { Card, CardBody, Spacer } from "@nextui-org/react";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: number } }) {
  const tournament = (await getTournament(params.id)).data;

  return { title: tournament?.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const tournaments = (await getTournaments()).data?.data ?? [];

  return tournaments.map((tournament) => ({ id: tournament.id.toString() }));
}

export default async function Tournament({ params }: Readonly<{ params: { id: string } }>) {
  const tournament = await getTournament(parseInt(params.id));

  if (!tournament) {
    return <div>404 - Not Found</div>;
  }

  return (
    <div className="w-100 h-100">
      <Card className="bg-transparent h-90 w-90 rounded-3xl" shadow="md">
        <CardBody className="flex flex-row justify-between rounded-3xl">
          <div className="flex flex-col justify-between text-center mx-4">
            TODO: Tournament Detail Page
            <p>{params.id}</p>
            <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
          </div>
        </CardBody>
      </Card>

      <Spacer y={4} />
    </div>
  );
}
