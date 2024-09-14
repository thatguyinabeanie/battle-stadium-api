"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import { Card, Image, CardBody, Spacer, Link, CardFooter } from "@nextui-org/react";

import { components } from "@/lib/battle-stadium-api";

export interface OrgCardProps {
  organization: components["schemas"]["OrganizationDetails"];
  cardProps?: CardProps;
}

export default function NewOrganizationCard({ organization, cardProps }: OrgCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl h-[400x] w-[300px] px-2">
      <Link key={organization.id} href={`/organizations/${organization.id}`}>
        <Card className="bg-transparent h-90 w-90 rounded-3xl" {...cardProps}>
          <CardBody>
            <div className="relative overflow-hidden p-1">
              <Image
                isBlurred
                isZoomed
                alt="Card image"
                className="hover:scale-105"
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
              <p className="text-small text-default-400">{"hello world"}</p>
            </div>
          </CardFooter>

          <div
            className="absolute inset-0 blur-3xl scale-125 opacity-35 "
            style={{
              backgroundImage: `url(${organization.logo_url ?? "/pokemon/vgc.png"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Card>
      </Link>
    </div>
  );
}
