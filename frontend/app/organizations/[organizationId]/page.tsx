import { auth } from "@clerk/nextjs/server";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import TournamentsTable from "@/components/tournaments-table";
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

export default async function OrganizationDetailPage({ params }: Readonly<{ params: { organizationId: number } }>) {
  const { data: organization } = await getOrganization(params.organizationId);
  const { data: tournaments } = await getTournaments(params.organizationId);

  return (
      <div className="w-3/4 h-100">
        <Card className="w-auto h-auto mb-2 " isBlurred shadow="md">
          {/* <CardHeader className="justify-center">{organization?.name}</CardHeader> */}
          <CardBody className="flex flex-row justify-evenly">
            <Image
              shadow="md"
              alt={ organization?.name }
              aria-label={ organization?.name }
              className="aspect-square flex flex-col gap-3 h-[300px] w-[300px]"
              src={ organization?.logo_url ?? "/pokemon/vgc.png" }
            />
          </CardBody>
        </Card>

      <Card className="w-auto mb-2" isBlurred>
        <CardBody className="flex flex-row justify-center">
          <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
        </CardBody>

      </Card>

      <TournamentsTable disableColumns={ ["organization.name"] } tournaments={ tournaments } />

      </div>

  );
}
