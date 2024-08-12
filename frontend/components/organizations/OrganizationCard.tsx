import React from "react";

import { Skeleton, Image } from "@/components/nextui-client-components";
import { cn } from "@/lib/utils";
import { OrganizationDetails } from "@/lib/api";
import { DEFAULT_IMAGE_SRC } from "@/lib/constants";

export type PlaceListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
  organization: OrganizationDetails;
};

const OrganizationCard = React.forwardRef<HTMLDivElement, PlaceListItemProps>(
  ({ organization, removeWrapper, className, isLoading, ...props }, ref) => {
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
        {...props}
      >
        <Image
          isBlurred
          isZoomed
          alt={organization.name}
          className="aspect-square w-full hover:scale-110"
          isLoading={isLoading}
          src={DEFAULT_IMAGE_SRC}
        />

        <div className="mt-1 flex flex-col gap-2 px-1">
          {isLoading ? (
            <div className="my-1 flex flex-col gap-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-3 w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="mt-4 w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-small font-medium text-default-700">
                  {organization.name}
                </h3>
                {/* {organization?.description !== undefined ? (
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-default-500"
                      icon="solar:star-bold"
                      width={16}
                    />
                    <span className="text-small text-default-500">
                      {organization?.description}
                    </span>
                  </div>
                ) : null} */}
              </div>
              {organization?.description ? (
                <p className="text-small text-default-500">
                  {organization?.description}
                </p>
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

{
  /* <Link
  key={ organization.id }
  aria-label={ `View details for ${organization.name}` }
  href={ `/organizations/${organization.id}` }
> */
}

export default OrganizationCard;
