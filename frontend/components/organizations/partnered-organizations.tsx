import { getOrganizations } from "@/app/server-actions/organizations/actions";
import OrganizationCard from "@/components/organizations/organization-card";

export default async function PartneredOrganizations() {
  const { partners } = await getOrganizations();

  return (
    <div className="bg-transparent w-full h-full flex flex-row overflow-x-scroll items-center justify-center overflow-y-hidden">
      {partners.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          organization={organization}
        />
      ))}
    </div>
  );
}
