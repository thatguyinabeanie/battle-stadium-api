"use client";

import { Card, CardBody } from "@/components/nextui-use-client";
import OrganizationLogo from "@/components/organizations/organization-logo";
import { components } from "@/lib/api/openapi-v1";

interface OrgDetailCardProps {
  organization: components["schemas"]["Organization"];
}

export default function OrgDetailCard({ organization }: Readonly<OrgDetailCardProps>) {
  return (
    <Card
      className="bg-transparent h-90 w-90 rounded-3xl backdrop-blur border-small border-neutral-500/40 "
      shadow="md"
    >
      <CardBody className="bg-transparent flex flex-row justify-between rounded-3xl">
        <OrganizationLogo organization={organization} />

        <div className="flex flex-col justify-between text-center mx-4">
          <h1 className="text-2xl font-semibold">{organization?.name}</h1>
          <p>{organization?.description}</p>
          <p>[ICON LINKS TO SOCIAL MEDIA PROFILES]</p>
        </div>

        <OrganizationLogo className="hidden sm:flex" organization={organization} />
      </CardBody>
    </Card>
  );
}
