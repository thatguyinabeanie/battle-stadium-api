import { getTournament, getTournaments } from "@/app/data/tournaments/actions";
import OrgTourCard from "@/app/organizations/[org_slug]/tournaments/[tournament_id]/org-tour-card";

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

  return <OrgTourCard organization={organization} tournament={tournament} />;
}
