import React from "react";
import { Metadata } from "next";

import { Tournament } from "@/lib/api";
import { OrganizationsTable } from "@/components/organizations/organizations-table";
import PartneredOrganizations from "@/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

export default async function OrganizationsPage() {
  return (
    <>
      <PartneredOrganizations />

      <OrganizationsTable />
    </>
  );
}
