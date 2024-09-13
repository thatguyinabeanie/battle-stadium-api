// organizations/[organizationId]/page.tsx
import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: organization } = await getOrganization(parseInt(params.id));

  return {
    title: organization?.name,
  };
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: organization } = await getOrganization(parseInt(params.id));

  return {
    title: organization?.name,
  };
}

async function getOrganization(organizationId: number) {
  return await BattleStadiumAPI.GET("/organizations/{org_id}", {
    params: {
      path: {
        org_id: organizationId,
      },
    },
  });
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 300;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const { data: organizations } = await BattleStadiumAPI.GET("/organizations", {
    next: { tags: ["organizations"] },
  });

  return organizations?.map((organization) => ({
    params: {
      organizationId: organization.id.toString(),
    },
  }));
}

async function getTournaments(organizationId: number) {
  return await BattleStadiumAPI.GET("/organizations/{org_id}/tournaments", {
    params: {
      path: {
        org_id: organizationId,
      },
    },
  });
}

export async function generateStaticParams() {
  const { data: organizations } = await BattleStadiumAPI.GET("/organizations", {
    next: { tags: ["organizations"] },
  });

  return (organizations ?? []).map((organization) => ({ organizationId: organization.id.toString() }));
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
