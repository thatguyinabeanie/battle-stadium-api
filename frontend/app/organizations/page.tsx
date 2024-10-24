import React from "react";
import { Metadata } from "next";

import OrganizationCard from "@/components/organizations/organization-card";
import { cn } from "@/lib/utils";
import { Tournament } from "@/lib/api";
import { getOrganizations } from "@/app/server-actions/organizations/actions";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

async function listOrganizations() {
  const allOrgs = (await getOrganizations()).data?.data;

  const partnerOrgs = (allOrgs || [])?.filter((org) => org.partner);
  const nonPartnerOrgs = (allOrgs || [])?.filter((org) => !org.partner);

  return [...partnerOrgs, ...nonPartnerOrgs];
}

export default async function OrganizationsPage() {
  const orgs = await listOrganizations();

  return (
    <div
      className={cn(
        "bg-transparent w-full h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      )}
    >
      {orgs.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          // className="cursor-pointer"
          organization={organization}
        />
      ))}
    </div>
  );
}
