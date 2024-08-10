import React from "react";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import { OrganizationsApi } from "@/api";
import OrganizationCard from "@/app/organizations/OrganizationCard";

export default async function OrganizationsPage() {
  const orgsApi = new OrganizationsApi();

  const organizations = (await orgsApi.listOrganizations()).data;

  return (
    <div>
      <h1 className={title()}>Organizations</h1>
      <div className="container relative flex flex-row">
        {organizations.map((organization) => (
          <div key={organization.id} className="m-4">
            <Link href={`/organizations/${organization.id}`}>
              <OrganizationCard
                key={organization.id}
                className="cursor-pointer"
                organization={organization}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
