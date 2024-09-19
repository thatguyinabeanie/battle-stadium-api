import { auth } from "@clerk/nextjs/server";
import { Card, CardBody, Image, Spacer } from "@nextui-org/react";

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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const org = await getOrganization(params.slug);

  return { title: org?.name ?? "Organization" };
}

async function getOrganization(slug: string) {
  return (await getApiClient().Organizations.get(slug)).data;
}

async function getTournaments(slug: string) {
  return (await getApiClient().Organizations.Tournaments.list(slug)).data;
}

export async function generateStaticParams() {
  const response = await getApiClient(false).Organizations.list();
  const orgs = response.data?.data;

  return (orgs ?? []).map((organization) => ({ slug: organization.slug }));
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
];

const organizationLogo = (
  organization: components["schemas"]["Organization"] | undefined,
  className: string | null = null,
) => (
  <Image
    alt={organization?.name}
    aria-label={organization?.name}
    className={`aspect-square gap-3 h-[6.25rem] w-[6.25rem] md:h-[9.375rem] md:w-[9.375rem] lg:h-[12.5rem] lg:w-[12.5rem] ${className}`}
    src={organization?.logo_url ?? "/pokemon/vgc.png"}
  />
);

export default async function OrganizationDetailPage({ params }: { params: { slug: string } }) {
  const organization = await getOrganization(params.slug);
  const tournaments = await getTournaments(params.slug);

  return (
    <div className="w-100 h-100">
      <Card className="bg-transparent h-90 w-90 rounded-3xl" shadow="md">
        <CardBody className="flex flex-row justify-between rounded-3xl">
          {organizationLogo(organization)}

          <div className="flex flex-col justify-between text-center mx-4">
            <h1 className="text-2xl font-semibold">{organization?.name}</h1>
            <p>{organization?.description}</p>
            <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
          </div>

          {organizationLogo(organization, "hidden sm:flex")}
        </CardBody>

        <div
          className="absolute inset-0 blur-3xl scale-200 opacity-15"
          style={ {
            backgroundImage: `url(${organization?.logo_url ?? "/pokemon/vgc.png"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backdropFilter: "blur(10px)",
          } }
        />
      </Card>

      <Spacer y={4} />

      <TournamentsTable columns={columns} tournaments={tournaments} />
    </div>
  );
}
