"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import clsx from "clsx";

import { Organization, OrganizationDetails } from "@/api";

interface OrganizationCardProps {
  organization: Organization | OrganizationDetails | null;
  className?: string;
}
const OrganizationCard = ({
  organization,
  className,
}: OrganizationCardProps) => (
  <Card isFooterBlurred className={clsx("border-none", className)} radius="lg">
    <Image
      alt="Woman listing to music"
      className="object-cover"
      height={200}
      src="https://nextui.org/images/hero-card.jpeg"
      width={200}
    />

    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
      <p className="text-tiny text-white/80">{organization?.name}</p>
    </CardFooter>
  </Card>
);

export default OrganizationCard;
