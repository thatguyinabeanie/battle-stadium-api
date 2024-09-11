// organizations/[organizationId]/page.tsx
import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/api/battle-stadium-api";

export interface OrganizationDetailPageProps {
  params: {
    organizationId: number;
  }
}

export default async function OrganizationDetailPage({ params: {organizationId} }: OrganizationDetailPageProps) {
  const organization = await BattleStadiumAPI().Organizations.get(organizationId);
  const tournaments = await BattleStadiumAPI().Organizations.Tournaments.list(organizationId);

  return (
    <>
      <OrganizationCard className="size-auto" organization={organization} />
      <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
    </>
  );
};

