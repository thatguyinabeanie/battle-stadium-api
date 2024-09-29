import { Spacer } from "@/components/nextui-use-client";
import TournamentsTable from "@/components/tournaments-table";
import { getOrganization, getOrganizations, getOrganizationTournaments } from "@/app/data/actions";

import OrgDetailCard from "./org-detail-card";

export const revalidate = 200;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { org_slug: string } }) {
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

interface OrganizationDetailPageProps {
  params: { org_slug: string };
}

export default async function OrganizationDetailPage({ params }: Readonly<OrganizationDetailPageProps>) {
  const { data: organization } = await getOrganization(params.org_slug);

  if (!organization) {
    return <div>404 - Not Found</div>;
  }

  const { data: tournaments } = await getOrganizationTournaments(params.org_slug);

  return (
    <div className="w-100 h-100 backdrop-blur-md">
      <OrgDetailCard organization={organization} />

      <Spacer y={4} />

      <TournamentsTable columns={columns} data={tournaments} />
    </div>
  );
}
