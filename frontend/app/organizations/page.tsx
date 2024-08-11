import React from "react";
import { Link } from "@nextui-org/link";

import { title } from "@/components/primitives";
import { OrganizationsApi } from "@/lib/api";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import clsx from "clsx";

export default async function OrganizationsPage() {
  const orgsApi = new OrganizationsApi();

  const organizations = (await orgsApi.listOrganizations()).data;

  return (
    <div>

      <h1 className={title()}>
        Organizations
      </h1>

      <div className={clsx("container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4")}>
        {organizations.map((organization) => (
          <Link key={organization.id} href={`/organizations/${organization.id}`}>
            <OrganizationCard
              key={organization.id}
              className="cursor-pointer"
              organization={organization}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
