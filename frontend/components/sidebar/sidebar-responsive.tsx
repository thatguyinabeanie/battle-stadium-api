"use client";

import React from "react";
import { Spacer } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";

import Logout from "./logout";

import BattleStadium from "@/components/battle-stadium";
import { cn } from "@/lib/utils";
import { ScrollShadow } from "@/components/client";
import Sidebar from "@/components/sidebar/sidebar";
import UserAvatar from "@/components/user-avatar";

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
      <BattleStadium aria-label="Battle Stadium Logo" isCompact={isCompact} />

      <Spacer y={8} />

      <UserAvatar isCompact={isCompact} session={session} />

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar defaultSelectedKey="home" isCompact={isCompact} />
      </ScrollShadow>
      <Spacer y={2} />

      <Logout isCompact={isCompact} />
    </div>
  );
}
