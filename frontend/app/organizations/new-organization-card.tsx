"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import { Card, Image, CardBody, Spacer, Link, Button, CardFooter } from "@nextui-org/react";

import { components } from "@/lib/battle-stadium-api";

export interface OrgCardProps {
  organization: components["schemas"]["OrganizationDetails"];
  cardProps?: CardProps;
}

export default function NewOrganizationCard({ organization, cardProps }: OrgCardProps) {
  return (
    <Link key={organization.id} href={`/organizations/${organization.id}`}>
      <Card className="w-[420px] h-50 bg-transparent" {...cardProps}>
        <CardBody className="px-3 pb-1">
          <div className="relative overflow-hidden rounded-xl">
            <div
              className="absolute inset-0 blur-xl scale-110 "
              style={{
                backgroundImage: `url(${organization.logo_url ?? "/pokemon/vgc.png"})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <Image
              isBlurred
              isZoomed
              alt="Card image"
              className="relative z-10 aspect-square w-40 h-40 hover:scale-110 object-cover object-top"
              src={organization.logo_url ?? "/pokemon/vgc.png"}
            />
          </div>

        </CardBody>
        <Spacer y={ 2 } />

        <CardFooter className="justify-between gap-2 w-full">
          <div className="flex flex-col gap-2 px-2">
            <p className="text-large font-medium" data-testid="org-name">
              { organization.name }
            </p>
            <p className="text-small text-default-400">{ organization.description }</p>
          </div>
          <Button className="w-auto">Continue</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
