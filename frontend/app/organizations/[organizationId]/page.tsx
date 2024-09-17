import { auth } from "@clerk/nextjs/server";
import { Card, CardBody, Image } from "@nextui-org/react";

import TournamentsTable from "@/components/tournaments-table";
import { BattleStadiumAPI, components } from "@/lib/battle-stadium-api";

export const revalidate = 200;
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

const organizationLogo = (organization: components["schemas"]["Organization"] | undefined, className: string|null= null) => (
  <Image
    alt={ organization?.name }
    aria-label={ organization?.name }
    className={`aspect-square gap-3 sm:h-[100px] sm:w-[100px] lg:h-[200px] lg:w-[200px] ${className}`}
    src={ organization?.logo_url ?? "/pokemon/vgc.png" }
  />
);

export default async function OrganizationDetailPage({ params }: Readonly<{ params: { organizationId: number } }>) {
  const { data: organization } = await getOrganization(params.organizationId);
  const { data: tournaments } = await getTournaments(params.organizationId);

  return (
    <div className="w-100 h-100">
      <Card isBlurred shadow="none">
        <CardBody className="flex flex-row justify-between">
          { organizationLogo(organization) }

          <div className="flex flex-col justify-between text-center mx-4">
            <h1 className="text-2xl font-semibold">{organization?.name}</h1>
            <p>{organization?.description}</p>
            <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
          </div>

          { organizationLogo(organization, "hidden md:flex") }
        </CardBody>
      </Card>

      <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
    </div>
  );
}
