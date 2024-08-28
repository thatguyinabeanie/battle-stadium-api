"use client";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar/sidebar";

export interface SideBarComponentProps {
  children?: React.ReactNode;
}

export default function SidebarResponsive() {
  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={cn("relative flex h-full w-90 flex-col !border-r-small border-divider p-6 transition-width", {
        "w-16 items-center px-2 py-6": isCompact,
      })}
    >
      <Sidebar defaultSelectedKey="home" />
    </div>
  );
}
