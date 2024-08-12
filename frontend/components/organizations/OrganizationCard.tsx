"use client";

import type { CardProps } from "@nextui-org/react";

import React from "react";
import { Image } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

import { Card, CardBody } from "@/components/nextui-client-components";
import { Organization, OrganizationDetails } from "@/lib/api";

interface OrganizationCardProps extends CardProps {
  organization: Organization | OrganizationDetails;
}

export default function OrganizationCard({
  organization,
  ...rest
}: OrganizationCardProps) {
  return (
    <Card className="w-[420px]" {...rest}>
      <CardBody className="px-3 pb-1">
        <Image
          alt="Card image"
          className="aspect-video w-full object-cover object-top"
          src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/airpods.png"
        />

        <Spacer y={2} />

        <div className="flex flex-col gap-2 px-2">
          <p className="text-large font-medium text-center">
            {organization.name}
          </p>
          <p className="text-small text-default-400 text-center">
            {organization.description}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
