import { getTournament, getTournaments } from "@/app/server-actions/tournaments/actions";
import { Chip, Divider, Spacer } from "@/components/nextui-use-client";
import OrganizationHeader from "@/components/organizations/org-header";

import Link from "next/link";

export const revalidate = 300;
export const dynamicParams = true;

interface OrganizationTournamentProps {
  params: Promise<{
    org_slug: string;
    tournament_id: number;
  }>;
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
      <Divider />

      <Spacer y={ 2 } />

      <OrganizationHeader organization={organization}>
        <div className="flex flex-col justify-between items-center text-center mx-4">
          <h1 className="text-2xl font-semibold">{tournament.name}</h1>
          <h2 className="flex flex-row gap-1">
            <p className="font-bold">Presented By: </p>
            {organization?.name}
          </h2>

          <Spacer y={2} />

          <p>Registration: {tournament.registration_start_at}</p>
          <p>Starts: {tournament.start_at}</p>
          <p>Check in opens: {tournament.check_in_start_at} </p>

          <Spacer y={2} />
        </div>
      </OrganizationHeader>

      <Spacer y={4} />

      <Divider />

      <Spacer y={ 2 } />

      <div className="flex flex-row gap-4 w-full justify-center items-center">
        <Chip color="default" variant="solid">Solid</Chip>
        <Chip color="default" variant="bordered">Bordered</Chip>
        <Chip color="default" variant="light">Light</Chip>
        <Chip color="default" variant="flat">Flat</Chip>
        <Chip color="default" variant="faded">Faded</Chip>
        <Chip color="default" variant="shadow">Shadow</Chip>
        <Chip color="default" variant="dot">Dot</Chip>
        <Link className="text-primary" href={ `/organizations/${org_slug}/tournaments/${tournament_id}/register` }>
          Register
        </Link>
      </div>

      <Spacer y={ 2 } />

      <Divider />

    </>
  );
}
