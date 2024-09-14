import React from "react";

import { Image } from "@/components/client";
import { cn } from "@/lib/utils";
import { components } from "@/lib/battle-stadium-api";

export type PlaceListItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  isLoading?: boolean;
  removeWrapper?: boolean;
  organization?: components["schemas"]["OrganizationDetails"];
};

export default function OrganizationCard(props: PlaceListItemProps) {
  const { organization, removeWrapper, className, isLoading, ...rest } = props;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 h-[300px] w-[300px]",
        {
          "rounded-none bg-background shadow-none": removeWrapper,
        },
        className,
      )}
      {...rest}
    >
      <Image
        isBlurred
        isZoomed
        alt={organization?.name}
        aria-label={organization?.name}
        className="aspect-square"
        isLoading={isLoading}
        src={organization?.logo_url ?? "/pokemon/vgc.png"}
      />
    </div>
  );
}
