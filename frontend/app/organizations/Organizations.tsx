"use client";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { Organization } from "@/lib/api";
import { Link } from "@nextui-org/link";
import { useQuery } from '@tanstack/react-query'
import { BattleStadiumAPI } from "@/battle-stadium-api";

export interface OrganizationsProps {
  initialOrganizations: Organization[];
}

export default function Organizations ({ initialOrganizations }: OrganizationsProps) {

  const { data: organizations, isLoading, error } = useQuery({
    queryKey: ['organizations'],
    queryFn: BattleStadiumAPI.Organizations.list,
    initialData: initialOrganizations,
    staleTime: 1000 * 60 * 60
  })

  return (
    <>
      {
      organizations.map((organization) => (
        <Link
          key={ organization.id }
          href={ `/organizations/${organization.id}` }
          aria-label={ `View details for ${organization.name}` }
        >
          <OrganizationCard
            key={ organization.id }
            className="cursor-pointer"
            organization={ organization }
          />
        </Link>
      ))
      }
    </>
  )
}
