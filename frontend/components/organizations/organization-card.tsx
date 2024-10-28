import Link from "next/link";

import { Organization } from "@/lib/api";
import { cn } from "@/lib/utils";
import OrganizationLogo from "./organization-logo";

export interface OrgCardProps {
  organization: Organization;
  disableHover?: boolean;
}

const LOGO_SIZE = 200;

export default function OrganizationCard({ organization, disableHover }: Readonly<OrgCardProps>) {
  return (
    <div className="bg-transparent relative px-2 border-none shadow-lg rounded-lg">
      <Link key={organization.slug} href={`/organizations/${organization.slug}`}>
        <div className="flex flex-col overflow-hidden p-2">
          <OrganizationLogo
            priority
            className={cn("rounded-3xl", {
              "hover:scale-105": !disableHover,
              "hover:z-50": !disableHover,
            })}
            logoSize={LOGO_SIZE}
            organization={organization}
            placeholder="blur"
          />
        </div>
      </Link>
    </div>
  );
}
