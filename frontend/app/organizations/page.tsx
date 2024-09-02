import React from "react";

import OrganizationCard from "@/components/organizations/OrganizationCard";
import { cn } from "@/lib/utils";
import { BattleStadiumAPI } from "@/lib/api";


const OrganizationsPage = async () => {
  const organizations = await BattleStadiumAPI().Organizations.list();

  return (
    <div
      className={cn(
        "h-full w-full my-auto grid grid-flow-row-dense max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      {organizations.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          className="cursor-pointer"
          organization={organization}
        />
      ))}
    </div>
  );
};

export default OrganizationsPage;
