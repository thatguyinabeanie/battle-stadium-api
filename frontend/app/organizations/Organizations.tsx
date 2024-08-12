"use client";
import { Link } from "@nextui-org/link";
import { useQuery } from "@tanstack/react-query";

import OrganizationCard from "@/components/organizations/OrganizationCard";
import { Organization } from "@/lib/fetch-api";
import { BattleStadiumAPI } from "@/battle-stadium-api";

export interface OrganizationsProps {
  initialOrganizations: Organization[];
}


const useOrganizationsQuery = (initialOrganizations: Organization[]) => {
   return useQuery({
    queryKey: ["organizations"],
    queryFn: BattleStadiumAPI.Organizations.list,
    initialData: initialOrganizations,
    staleTime: 1000 * 60 * 60,
  });
}

export default function Organizations({
  initialOrganizations,
}: Readonly<OrganizationsProps>) {
  const { data: organizations } = useOrganizationsQuery(initialOrganizations);
  return (
    <div
      aria-label="organizations-list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10"
    >
      {organizations.map((organization) => (
        <Link
          key={organization.id}
          aria-label={`View details for ${organization.name}`}
          href={`/organizations/${organization.id}`}
        >
          <OrganizationCard
            aria-label={`organization-card-${organization.id}`}
            className="cursor-pointer"
            organization={organization}
          />
        </Link>
      ))}
    </div>
  );
}
