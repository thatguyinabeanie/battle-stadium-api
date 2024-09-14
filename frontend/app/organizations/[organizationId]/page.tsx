
import { auth } from "@clerk/nextjs/server";

import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export const revalidate = 300;
export const dynamicParams = true;

function getApiClient(shouldAuth = true) {
  if (shouldAuth) {
    return BattleStadiumAPI(auth());
  }

  return BattleStadiumAPI();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: org } = await getOrganization(parseInt(params.id));

  return { title: org?.name ?? "Organization" };
}

async function getOrganization(organizationId: number) {
  return await getApiClient().Organizations.get(organizationId);
}

async function getTournaments(organizationId: number) {
  return await getApiClient().Organizations.Tournaments.list(organizationId);
}

export async function generateStaticParams() {
  const response = await getApiClient(false).Organizations.list({ next: { tags: ["organizations"] } });
  const orgs = response.data?.data;

  return (orgs ?? []).map((organization) => ({ organizationId: organization.id.toString() }));
}

export default async function OrganizationDetailPage({ params }: { params: { organizationId: number } }) {
  const { data: organization } = await getOrganization(params.organizationId);
  const { data: tournaments } = await getTournaments(params.organizationId);

  return (
    <>
      <div className="mb-4 flex flex-col grid-cols-1 justify-center">
        <OrganizationCard organization={organization} />
        <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
      </div>
    </>
  );
}
