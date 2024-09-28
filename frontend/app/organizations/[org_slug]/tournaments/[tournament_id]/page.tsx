import { getTournament, getTournaments } from "@/app/data/actions";
import OrganizationLogo from "@/components/organizations/organization-logo";
import { Card, CardBody } from "@nextui-org/react";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { org_slug: string; tournament_id: number } }) {
  const tournament = (await getTournament(params.tournament_id)).data;

  return { title: tournament?.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const tournaments = (await getTournaments()).data?.data ?? [];

  return tournaments.map(({ organization, id }) => ({ org_slug: organization.slug, tournament_id: id.toString() }));
}

export default async function OrganizationTournament({
  params,
}: Readonly<{ params: { org_slug: string; tournament_id: string } }>) {
  const tournament = (await getTournament(parseInt(params.tournament_id))).data;

  if (!tournament) {
    return <div>404 - Not Found</div>;
  }

  const { organization } = tournament;

  return (
    <Card className="bg-transparent h-90 w-90 rounded-3x backdrop-blur-sm " shadow="md">
      <CardBody className="bg-transparent flex flex-row justify-between rounded-3xl">
        <OrganizationLogo organization={organization} />

        <div className="flex flex-col justify-between text-center mx-4">
          <h1 className="text-2xl font-semibold">{tournament.name}</h1>
          <h2>{organization?.name}</h2>

          <p>{organization?.description}</p>
          <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
        </div>

        <OrganizationLogo className="hidden sm:flex" organization={organization} />
      </CardBody>
    </Card>
  );
}
