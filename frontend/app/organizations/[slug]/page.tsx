import { Card, CardBody, Spacer } from "@nextui-org/react";
import TournamentsTable from "@/components/tournaments-table";
import { getOrganization, getOrganizations, getOrganizationTournaments } from "@/app/data/actions";
import OrganizationLogo from "@/components/organizations/organization-logo";

export const revalidate = 200;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: org } = await getOrganization(params.slug);

  return { title: org?.name ?? "Organization" };
}

export async function generateStaticParams() {
  const orgs = (await getOrganizations()).data?.data ?? [];

  return orgs.map(({ slug }) => ({ slug }));
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

interface OrganizationDetailPageProps {
  params: { slug: string };
}

export default async function OrganizationDetailPage({ params }: Readonly<OrganizationDetailPageProps>) {
  const { data: organization } = await getOrganization(params.slug);

  if (!organization) {
    return <div>404 - Not Found</div>;
  }

  const { data: tournaments } = await getOrganizationTournaments(params.slug);

  return (
    <div className="w-100 h-100">
      <Card className="bg-transparent h-90 w-90 rounded-3xl" shadow="md">
        <CardBody className="flex flex-row justify-between rounded-3xl">
          <OrganizationLogo organization={organization} />

          <div className="flex flex-col justify-between text-center mx-4">
            <h1 className="text-2xl font-semibold">{organization?.name}</h1>
            <p>{organization?.description}</p>
            <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
          </div>

          <OrganizationLogo className="hidden sm:flex" organization={organization} />
        </CardBody>

        <div
          className="absolute inset-0 blur-3xl scale-200 opacity-15"
          style={{
            backgroundImage: `url(${organization?.logo_url ?? "/pokemon/vgc.png"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backdropFilter: "blur(10px)",
          }}
        />
      </Card>

      <Spacer y={4} />

      <TournamentsTable columns={columns} data={tournaments} />
    </div>
  );
}
