import { Spacer } from "@/components/nextui-use-client";
import TournamentsTable from "@/components/tournaments-table";
import { getOrganization, getOrganizations } from "@/app/server-actions/organizations/actions";
import { getOrganizationTournaments } from "@/app/server-actions/organizations/tournaments/actions";

import OrgDetailCard from "@/components/org-detail-card";

export const revalidate = 200;
export const dynamicParams = true;

interface OrganizationDetailPageProps {
  params: { org_slug: string };
}

export async function generateMetadata(props: Readonly<OrganizationDetailPageProps>) {
  const params = await props.params;
  const { data: org } = await getOrganization(params.org_slug);

  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams() {
  const orgs = (await getOrganizations()).data?.data ?? [];

  return orgs.map(({ slug }) => ({ org_slug: slug }));
}

const columns = [
  {
    key: "start_at",
    label: "DATE",
  },
  {
    key: "name",
    label: "NAME",
  },

  {
    key: "players",
    label: "PLAYERS",
  },
  {
    key: "registration",
    label: "REGISTRATION",
  },
  {
    key: "game",
    label: "GAME",
  },
  {
    key: "format",
    label: "FORMAT",
  },
];

export default async function OrganizationDetailPage(props: Readonly<OrganizationDetailPageProps>) {
  const params = await props.params;
  const { data: organization } = await getOrganization(params.org_slug);

  if (!organization) {
    return <div>404 - Not Found</div>;
  }

  const { data: tournaments } = await getOrganizationTournaments(params.org_slug);

  return (
    <div className="w-100 h-100 bg-transparent">
      <OrgDetailCard organization={organization} />

      <Spacer y={4} />

      <TournamentsTable columns={columns} data={tournaments} />
    </div>
  );
}
