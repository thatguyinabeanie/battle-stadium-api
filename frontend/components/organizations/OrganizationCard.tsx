import React from "react";

import LoadingPlaceholder from "./loading-place-holder";

import { Image, Link } from "@/components/client/nextui-components";
import { cn } from "@/lib/utils";
import { OrganizationDetails } from "@/lib/api";

export type PlaceListItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  isLoading?: boolean;
  removeWrapper?: boolean;
  organization: OrganizationDetails;
};

const OrganizationCard = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  ({ organization, removeWrapper, className, isLoading, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full flex-col gap-3",
          {
            "rounded-none bg-background shadow-none": removeWrapper,
          },
          className,
        )}
        {...rest}
      >
        <Link
          key={organization.id}
          aria-label={`View details for ${organization.name}`}
          href={`/organizations/${organization.id}`}
        >
          <Image
            isBlurred
            isZoomed
            alt={organization.name}
            aria-label={organization.name}
            className="aspect-square w-full hover:scale-110"
            isLoading={isLoading}
            src="/pokemon/vgc.png"
          />
        </Link>

        <div className="mt-1 flex flex-col gap-2 px-1">
          {isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <>
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-small font-medium text-default-700">{organization.name}</h3>
              </div>
              {organization?.description ? (
                <p className="text-small text-default-500">{organization?.description}</p>
              ) : null}
              <p className="text-small font-medium text-default-500">$100</p>
            </>
          )}
        </div>
      </div>
    );
  },
);

OrganizationCard.displayName = "OrganizationCard";

export default OrganizationCard;
