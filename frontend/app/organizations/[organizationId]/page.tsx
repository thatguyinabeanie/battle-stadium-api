// organizations/[organizationId]/page.tsx
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

const OrganizationDetailsPage = async ({ params }: { params: { organizationId: string } }) => {
  try {
    const organization = await BattleStadiumAPI().Organizations.get(parseInt(params.organizationId));

    return <OrganizationCard className="size-auto" organization={organization} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch organization details:", error);

    return <p>Failed to fetch organization</p>;
  }
};

export default OrganizationDetailsPage;
