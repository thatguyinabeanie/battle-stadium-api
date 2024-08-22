"use client";
import React from "react";
import { Spacer } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";

import { Button, Tooltip } from "@/components/nextui-client-components";
import BattleStadium, { BattleStadiumIcon } from "@/components/battle-stadium";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar/sidebar";
import UserAvatar from "@/components/user-avatar";
import { useSession } from 'next-auth/react';
import Logout from "./logout";
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
  const { data: session } = useSession();

  return (
    <div
      className={cn("relative flex h-full w-90 flex-col !border-r-small border-divider p-6 transition-width", {
        "w-16 items-center px-2 py-6": isCompact,
      })}
    >
      <div
        className={cn(
          "flex items-center gap-3 px-3",

          {
            "justify-center gap-0": isCompact,
          },
        )}
      >
        <BattleStadium isCompact={isCompact} />
      </div>

      <Spacer y={8} />

      <UserAvatar isCompact={ isCompact } session={ session }/>

      <Sidebar defaultSelectedKey="home" isCompact={isCompact} />

      <Spacer y={2} />

      <div
        className={cn("mt-auto flex flex-col", {
          "items-center": isCompact,
        })}
      >
        <Tooltip content="Help & Feedback" isDisabled={!isCompact} placement="right">
          <Button
            fullWidth
            className={cn("justify-start truncate text-default-500 data-[hover=true]:text-foreground", {
              "justify-center": isCompact,
            })}
            isIconOnly={isCompact}
            startContent={
              isCompact ? null : (
                <Icon className="flex-none text-default-500" icon="solar:info-circle-line-duotone" width={24} />
              )
            }
            variant="light"
          >
            {isCompact ? (
              <Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={24} />
            ) : (
              "Help & Information"
            )}
          </Button>
        </Tooltip>

        <Logout isCompact={isCompact} />
      </div>
    </div>
  );
}
