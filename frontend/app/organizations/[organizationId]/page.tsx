// organizations/[organizationId]/page.tsx
import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

export interface OrganizationDetailPageProps {
  params: {
    organizationId: number;
  };
}

async function getOrganization(organizationId: number) {
  return await BattleStadiumAPI.GET("/organizations/{org_id}", {
    params: {
      path: {
        org_id: organizationId
      },
    }
  });
};

async function getTournaments(organizationId: number) {
  return await BattleStadiumAPI.GET("/organizations/{org_id}/tournaments", {
    params: {
      path: {
        org_id: organizationId
      },
    }
  });
}

export default async function OrganizationDetailPage({ params: { organizationId } }: OrganizationDetailPageProps) {
  const {data: organization} = await getOrganization(organizationId);
  const {data: tournaments} = await getTournaments(organizationId);

  return (
    <>
      <OrganizationCard className="size-auto" organization={organization} />
      <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
    </>
  );
}
