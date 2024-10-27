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
    <div className="bg-transparent relative h-[250px] px-2 border-none shadow-lg rounded-lg">
      <Link key={organization.slug} href={`/organizations/${organization.slug}`}>
        <div className="flex flex-col overflow-hidden p-2">
          <Image
            priority
            alt="Card image"
            aria-label={organization?.name}
            blurDataURL={organization?.logo_url ?? "/pokemon/vgc.png"}
            className={cn("rounded-3xl", {
              "hover:scale-105": !disableHover,
              "hover:z-50": !disableHover,
            })}
            height={250}
            placeholder="blur"
            src={organization.logo_url ?? "/pokemon/vgc.png"}
            width={200}
          />
        </div>
      </Link>
    </div>
  );
}
