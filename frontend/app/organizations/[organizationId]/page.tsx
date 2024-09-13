// organizations/[organizationId]/page.tsx
import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 300;
export const dynamicParams = true;

function getApiClient() {
  return BattleStadiumAPI(auth());
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const {data: org} = await getOrganization(parseInt(params.id));
  return { title: org?.name ?? "Organization" };
}

async function getOrganization(organizationId: number) {
  return await getApiClient().Organizations.get(organizationId);
}

async function getTournaments(organizationId: number) {
  return await getApiClient().Organizations.Tournaments.list(organizationId);
}

export async function generateStaticParams() {
  const { data: orgs } = await getApiClient().Organizations.list({ next: { tags: ["organizations"] }, })

  console.log('organizations', orgs);

  return (orgs ?? []).map((organization) => ({ organizationId: organization.id.toString() }));
}

export default async function OrganizationDetailPage({ params }: { params: { organizationId: number } }) {
  const { data: organization } = await getOrganization(params.organizationId);
  const { data: tournaments } = await getTournaments(params.organizationId);

  return (
    <>
      <OrganizationCard className="size-auto" organization={organization} />
      <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
    </>
  );
}
