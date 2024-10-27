import React from "react";
import { Metadata } from "next";

import { Tournament } from "@/lib/api";
import PartneredOrganizations from "@/components/organizations/partnered-organizations";
import NextUiTable from "@/components/nextui-table";
import { Spacer } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

export default async function OrganizationsPage() {
  return (
    <>
      <Spacer y={4} />

      <PartneredOrganizations />

      <NextUiTable />
    </>
  );
}
