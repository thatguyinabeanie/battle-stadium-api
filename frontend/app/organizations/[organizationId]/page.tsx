// organizations/[organizationId]/page.tsx
import { OrganizationDetails, OrganizationsApi } from "@/lib/api";
import OrganizationCard from "@/components/organizations/OrganizationCard";

const OrganizationDetailsPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const orgsApi = new OrganizationsApi();
  const request = { id: parseInt(params.organizationId) };

  let organization: OrganizationDetails | null = null;

  try {
    organization = (await orgsApi.getOrganization(request)).data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch organization details:", error);

    return <p>Failed to fetch organization</p>;
  }

  return <OrganizationCard className="size-auto" organization={organization} />;
};

export default OrganizationDetailsPage;
