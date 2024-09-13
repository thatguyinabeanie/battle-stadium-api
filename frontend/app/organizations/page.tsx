import React from "react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";
import { BattleStadiumAPI, type components } from "@/lib/battle-stadium-api";

import NewOrganizationCard from "./new-organization-card";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Array<components["schemas"]["OrganizationDetails"]>;
}

async function getOrgs() {
  const { data: orgs } = await BattleStadiumAPI(auth()).Organizations.list({
    next: { tags: ["organizations"] },
  });

  return orgs;
}

export default async function OrganizationsPage() {
  const orgs = await getOrgs();

  return (
    <div
      className={cn("my-auto grid grid-cols-1 gap-5 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5")}
    >
      {orgs?.map((organization) => (
        <NewOrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          // className="cursor-pointer"
          organization={organization}
        />
      ))}
    </div>
  );
}
