import React from "react";
import { Image, Link } from "@/components/nextui-use-client";

import { Organization } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface OrgCardProps {
  organization: Organization;
  disableHover?: boolean;
}

export default function OrganizationCard({ organization, disableHover }: Readonly<OrgCardProps>) {
  return (
    <div className="bg-transparent relative h-[400px] w-[300px] px-2 border-none">
      <Link key={organization.slug} href={`/organizations/${organization.slug}`}>
        <div className="flex flex-col">
          <div>
            <div className="overflow-hidden p-1">
              <Image
                isZoomed
                alt="Card image"
                className={cn("rounded-3xl", {
                  "hover:scale-105": !disableHover,
                  "hover:z-50": !disableHover,
                })}
                src={organization.logo_url ?? "/pokemon/vgc.png"}
              />
            </div>
          </div>

          <div className="justify-center align-bottom h-full w-full">
            <div className="flex flex-col grid-cols-1 gap-2 px-3 pb-3 text-center">
              <p className="flex-col text-large font-medium sm:text-small" data-testid="org-name">
                {organization.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
