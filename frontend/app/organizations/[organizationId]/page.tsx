// organizations/[organizationId]/page.tsx
import TournamentsTable from "@/app/tournaments/TournamentsTable";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/api";

const OrganizationDetailsPage = async ({ params }: { params: { organizationId: number } }) => {
  const organization = await BattleStadiumAPI().Organizations.get(params.organizationId);
  const tournaments = await BattleStadiumAPI().Organizations.Tournaments.list(params.organizationId);

  return (
    <>
      <OrganizationCard className="size-auto" organization={organization} />
      <TournamentsTable disableColumns={["organization.name"]} tournaments={tournaments} />
    </>
  );
};

export default OrganizationDetailsPage;
