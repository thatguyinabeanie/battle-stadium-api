// organizations/[organizationId]/page.tsx
import { OrganizationDetails, OrganizationsApi } from "@/api";
import OrganizationCard from "@/app/organizations/OrganizationCard";

const OrganizationDetailsPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const orgsApi = new OrganizationsApi();
  const request = { id: params.organizationId };

  let organization: OrganizationDetails | null = null;

  try {
    organization = (await orgsApi.getOrganization(request)).data;
  } catch (error) {
    console.error("Failed to fetch organization details:", error);

    return <p>Failed to fetch organization</p>;
  }

  return <OrganizationCard className="size-auto" organization={organization} />;
};

export default OrganizationDetailsPage;
