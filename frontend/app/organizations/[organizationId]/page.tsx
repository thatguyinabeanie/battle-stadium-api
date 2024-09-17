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
      <div className="flex-col md:w-90 lg:w-3/4 h-100">
        <Card className="w-auto h-auto mb-2 " isBlurred shadow="md">

          <CardBody className="flex flex-row justify-between">
            <Image
              shadow="md"
              alt={ organization?.name }
              aria-label={ organization?.name }
            className="aspect-square gap-3  h-[100px] w-[100px] lg:h-[300px] lg:w-[300px]"
              src={ organization?.logo_url ?? "/pokemon/vgc.png" }
            />

            <div className="flex flex-col justify-between text-center" >
              <h1 className="text-2xl font-semibold">{ organization?.name }</h1>
              <p >{ organization?.description }</p>
              <p >[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
            </div>

            <Image
              shadow="md"
              alt={ organization?.name }
              aria-label={ organization?.name }
              className="aspect-square gap-3 sm:h-[100px] w-[100px] lg:h-[300px] lg:w-[300px] hidden lg:flex"
              src={ organization?.logo_url ?? "/pokemon/vgc.png" }
            />
          </CardBody>
        </Card>


      <TournamentsTable disableColumns={ ["organization.name"] } tournaments={ tournaments } />

      </div>

  );
}
