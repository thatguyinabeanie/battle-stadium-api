import { getTournament, getTournaments } from "@/app/server-actions/tournaments/actions";
import OrgTourCard from "@/components/organizations/org-tour-card";

import Link from "next/link";

export const revalidate = 300;
export const dynamicParams = true;

interface OrganizationTournamentProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>
}

export async function generateMetadata(props: Readonly<OrganizationTournamentProps>) {
  const params = await props.params;
  const tournament = (await getTournament(params.tournament_id)).data;

  return { title: tournament?.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const tournaments = (await getTournaments()).data?.data ?? [];

  return tournaments.map(({ organization, id }) => ({ org_slug: organization.slug, tournament_id: id.toString() }));
}

export default async function OrganizationTournament(props: Readonly<OrganizationTournamentProps>) {
  const params = await props.params;
  const { org_slug, tournament_id } = params;
  const tournament = (await getTournament(tournament_id)).data;

  if (!tournament) {
    return <div>404 - Not Found</div>;
  }

  const { organization } = tournament;

  return (
    <>
      <OrgTourCard organization={organization} tournament={tournament} />
      <Link href={`/organizations/${org_slug}/tournaments/${tournament_id}/register`}>Register</Link>
    </>
  );
}
