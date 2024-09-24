import React from "react";

import { Image } from "@nextui-org/react";
import { Organization } from "@/lib/api";

export type PlaceListItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  isLoading?: boolean;
  organization?: Organization;
};

export default function OrganizationCard(props: PlaceListItemProps) {
  const { organization, isLoading } = props;

  return (
    <Image
      isBlurred
      isZoomed
      alt={organization?.name}
      aria-label={organization?.name}
      className="aspect-square flex flex-col gap-3 h-[300px] w-[300px]"
      isLoading={isLoading}
      src={organization?.logo_url ?? "/pokemon/vgc.png"}
    />
  );
}
