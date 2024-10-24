import OrganizationLogo from "@/components/organizations/organization-logo";
import { components } from "@/lib/api/openapi-v1";

interface OrgTourCardProps {
  organization: components["schemas"]["Organization"];
  tournament: components["schemas"]["Tournament"];
}

export default function OrgTourCard({ organization, tournament }: Readonly<OrgTourCardProps>) {
  return (
    <div className="bg-transparent flex flex-row w-3/4 justify-between items-center">
      <OrganizationLogo organization={organization} />

      <div className="flex flex-col justify-between text-center mx-4">
        <h1 className="text-2xl font-semibold">{tournament.name}</h1>
        <h2>{organization?.name}</h2>

        <p>{organization?.description}</p>
        <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
      </div>

      <OrganizationLogo className="hidden sm:flex" organization={organization} />
    </div>
  );
}
