"use client";
import React from "react";
import { Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";

import { Avatar, Button, Tooltip } from "@/components/nextui-client-components";
import { AcmeIcon } from "@/components/acme";
import { sectionItemsWithTeams } from "@/components/sidebar-items";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";

export interface SideBarComponentProps {
  children?: React.ReactNode;
}

/**
 *  This example requires installing the `usehooks-ts` package:
 * `npm install usehooks-ts`
 *
 * import {useMediaQuery} from "usehooks-ts";
 *
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function SidebarResponsive() {
  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={cn(
        "relative flex h-full w-60 flex-col !border-r-small border-divider p-6 transition-width",
        {
          "w-16 items-center px-2 py-6": isCompact,
        },
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-3",

          {
            "justify-center gap-0": isCompact,
          },
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
          <AcmeIcon className="text-background" />
        </div>

        <span
          className={cn("text-small font-bold uppercase opacity-100", {
            "w-0 opacity-0": isCompact,
          })}
        >
          Acme
        </span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <Avatar
          isBordered
          className="flex-none"
          size="sm"
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
        <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
          <p className="truncate text-small font-medium text-default-600">
            John Doe
          </p>
          <p className="truncate text-tiny text-default-400">
            Product Designer
          </p>
        </div>
      </div>

      <Sidebar
        defaultSelectedKey="home"
        isCompact={isCompact}
        items={sectionItemsWithTeams}
      />

      <Spacer y={2} />
      <div
        className={cn("mt-auto flex flex-col", {
          "items-center": isCompact,
        })}
      >
        <Tooltip
          content="Help & Feedback"
          isDisabled={!isCompact}
          placement="right"
        >
          <Button
            fullWidth
            className={cn(
              "justify-start truncate text-default-500 data-[hover=true]:text-foreground",
              {
                "justify-center": isCompact,
              },
            )}
            isIconOnly={isCompact}
            startContent={
              isCompact ? null : (
                <Icon
                  className="flex-none text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              )
            }
            variant="light"
          >
            {isCompact ? (
              <Icon
                className="text-default-500"
                icon="solar:info-circle-line-duotone"
                width={24}
              />
            ) : (
              "Help & Information"
            )}
          </Button>
        </Tooltip>

        <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
          <Button
            className={cn(
              "justify-start text-default-500 data-[hover=true]:text-foreground",
              {
                "justify-center": isCompact,
              },
            )}
            isIconOnly={isCompact}
            startContent={
              isCompact ? null : (
                <Icon
                  className="flex-none rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              )
            }
            variant="light"
          >
            {isCompact ? (
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            ) : (
              "Log Out"
            )}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
