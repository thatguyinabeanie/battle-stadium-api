import React from "react";

import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/client";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { OrganizationDetails } from "@/lib/api";

const OrganizationsPage = async () => {
  const orgs = (
    await prisma.organizations.findMany({
      include: {
        users: true,
      },
    })
  ).map((org) => ({
    ...org,
    owner: org.users
      ? {
          ...org.users,
          username: org.users.username ?? "",
        }
      : {
          id: "",
          email: "",
          username: "",
          created_at: new Date(),
          updated_at: new Date(),
          encrypted_password: "",
          reset_password_token: null,
          reset_password_sent_at: null,
          admin: false,
          pronouns: "",
        },
    logoUrl: org.logo_url ?? "/pokemon/vgc.png",
  }));

  return (
    <div
      className={cn(
        "h-full w-full my-auto grid grid-flow-row-dense max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      {orgs.map((organization) => (
        <OrganizationCard
          key={organization.id}
          aria-label={`organization-card-${organization.id}`}
          className="cursor-pointer"
          organization={organization as unknown as OrganizationDetails}
        />
      ))}
    </div>
  );
};

export default OrganizationsPage;
