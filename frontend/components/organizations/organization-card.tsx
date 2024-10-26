import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Organization } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface OrgCardProps {
  organization: Organization;
  disableHover?: boolean;
}

export default function OrganizationCard({ organization, disableHover }: Readonly<OrgCardProps>) {
  return (
    <div className="bg-transparent relative h-[250px] w-[200px] px-2 border-none shadow-lg rounded-lg">
      <Link key={organization.slug} href={`/organizations/${organization.slug}`}>
        <div className="flex flex-col overflow-hidden p-2">
          <Image
            priority
            width={200}
            height={250}
            alt="Card image"
            className={cn("rounded-3xl", {
              "hover:scale-105": !disableHover,
              "hover:z-50": !disableHover,
            })}
            aria-label={ organization?.name }
            placeholder="blur"
            blurDataURL={ organization?.logo_url ?? "/pokemon/vgc.png" }
            src={organization.logo_url ?? "/pokemon/vgc.png"}
          />

          <div className="justify-center align-bottom h-full w-full">
            <div className="flex flex-col grid-cols-1 gap-2 px-3 pb-3 text-center">
              <p className="flex-col text-large font-medium sm:text-small text-primary" data-testid="org-name">
                {organization.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
