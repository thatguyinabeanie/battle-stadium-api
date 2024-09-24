import type { CardProps } from "@nextui-org/react";

import React from "react";
import { Card, Image, CardBody, Spacer, Link, CardFooter, cn } from "@nextui-org/react";

import { Organization } from "@/lib/api";

export interface OrgCardProps {
  organization: Organization;
  cardProps?: CardProps;
  disableHover?: boolean;
}

export default function NewOrganizationCard({ organization, cardProps, disableHover }: Readonly<OrgCardProps>) {
  return (
    <div className="relative h-[400x] w-[300px] px-2">
      <Link key={organization.slug} href={`/organizations/${organization.slug}`}>
        <Card className="bg-transparent h-90 w-90 rounded-3xl" {...cardProps} shadow="md">
          <CardBody>
            <div className="relative overflow-hidden p-1">
              <Image
                isBlurred
                isZoomed
                alt="Card image"
                className={cn("", {
                  "hover:scale-105": !disableHover,
                  "hover:z-50": !disableHover,
                })}
                src={organization.logo_url ?? "/pokemon/vgc.png"}
              />
            </div>
          </CardBody>

          <Spacer y={2} />

          <CardFooter className="justify-center align-bottom h-full w-full">
            <div className="flex flex-col grid-cols-1 gap-2 px-3 pb-3 text-center">
              <p className="flex-col text-large font-medium sm:text-small h-[50px]" data-testid="org-name">
                {organization.name}
              </p>
              <p className="text-small text-default-400">hello world</p>
            </div>
          </CardFooter>

          <div
            className="absolute inset-0 blur-3xl scale-150 opacity-50"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backdropFilter: "blur(20px)",
            }}
          />
        </Card>
      </Link>
    </div>
  );
}
