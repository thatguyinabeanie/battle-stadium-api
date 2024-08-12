// organizations/[organizationId]/page.tsx
import { OrganizationDetails } from "@/lib/api";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { BattleStadiumAPI } from "@/battle-stadium-api";

const OrganizationDetailsPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const request = { id: parseInt(params.organizationId) };

  let organization: OrganizationDetails | null = null;

  try {
    organization = await BattleStadiumAPI.Organizations.get(request);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch organization details:", error);

    return <p>Failed to fetch organization</p>;
  }

  return <OrganizationCard className="size-auto" organization={organization} />;
};

export default OrganizationDetailsPage;
