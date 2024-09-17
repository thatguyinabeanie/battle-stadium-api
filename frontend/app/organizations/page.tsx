import React from "react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import NewOrganizationCard from "@/components/organizations/new-organization-card";
import { cn } from "@/lib/utils";
import { BattleStadiumAPI, type components } from "@/lib/battle-stadium-api";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Array<components["schemas"]["OrganizationDetails"]>;
}

async function getOrgs(_page?: number, _per_page?: number, _partner?: boolean) {
  const { data: orgs } = await BattleStadiumAPI(auth()).Organizations.list({
    next: { tags: ["organizations"], revalidate: 300 },
  });

  return orgs;
}

export default async function OrganizationsPage() {
  const allOrgs = (await getOrgs())?.data;

  const partnerOrgs = (allOrgs || [])?.filter((org) => org.partner);
  const nonPartnerOrgs = (allOrgs || [])?.filter((org) => !org.partner);

  return (
    <div
      className={cn(
        "w-100 my-auto grid gap-5 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      )}
    >
      {[...partnerOrgs, ...nonPartnerOrgs]?.map((organization) => (
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
