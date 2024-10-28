import TournamentsTable from "@/components/tournaments-table";
import { getOrganization, getOrganizations } from "@/app/server-actions/organizations/actions";
import { getOrganizationTournaments } from "@/app/server-actions/organizations/tournaments/actions";

import OrganizationHeader from "@/components/organizations/org-header";
import { Divider, Spacer } from "@nextui-org/react";

export const revalidate = 200;
export const dynamicParams = true;

interface OrganizationDetailPageProps {
  params: Promise<{ org_slug: string }>;
}

export async function generateMetadata(props: Readonly<OrganizationDetailPageProps>) {
  const params = await props.params;
  const { data: org } = await getOrganization(params.org_slug);

  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams() {
  const { partners, nonpartners } = await getOrganizations();

  return [...partners, ...nonpartners].map(({ slug }) => ({ org_slug: slug }));
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
    <>
      <Spacer y={2} />
      <OrganizationHeader organization={organization}>
        <div className="flex flex-col justify-between h-full w-full items-center text-center mx-4 ">
          <h1 className="text-2xl font-semibold">{organization?.name}</h1>
          <p>{organization?.description}</p>
        </div>
      </OrganizationHeader>

      <Divider />

      <TournamentsTable columns={columns} data={tournaments} />
    </>
  );
}
