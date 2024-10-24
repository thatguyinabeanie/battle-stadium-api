import OrganizationLogo from "@/components/organizations/organization-logo";
import { components } from "@/lib/api/openapi-v1";

interface OrgDetailCardProps {
  organization: components["schemas"]["Organization"];
}

export default function OrgDetailCard({ organization }: Readonly<OrgDetailCardProps>) {
  return (
    <div className="bg-transparent flex flex-row w-3/4 justify-between items-center">
      <OrganizationLogo organization={organization} />

      <div className="flex flex-col justify-between text-center mx-4">
        <h1 className="text-2xl font-semibold">{organization?.name}</h1>
        <p>{organization?.description}</p>
        <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
      </div>

      <OrganizationLogo className="hidden sm:flex" organization={organization} />
    </div>
  );
}
