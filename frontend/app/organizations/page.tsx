import React from "react";

import { cn } from "@/lib/utils";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { Metadata } from "next";
import {BattleStadiumAPI, type components} from "@/lib/battle-stadium-api";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: components["schemas"]["OrganizationDetails"][];
}

async function getOrgs() {
  return BattleStadiumAPI.GET("/organizations");
}

export default async function OrganizationsPage() {
  const {data: orgs} = await getOrgs();

  return (
    <div
      className={cn(
        "h-full w-full my-auto grid grid-flow-row-dense max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      {orgs?.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          className="cursor-pointer"
          organization={organization}
        />
      ))}
    </div>
  );
}
