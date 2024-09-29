"use client";

import React from "react";
import NavbarLinkClientItem from "@/components/navbar/navbar-client-item";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default function NavbarLinks({ isSignedIn }: Readonly<NavbarLinksProps>) {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];

  return (
    <>
      <NavbarLinkClientItem firstSegment={firstSegment} path="organizations">
        Organizations
      </NavbarLinkClientItem>

      <NavbarLinkClientItem firstSegment={firstSegment} path="tournaments">
        Tournaments
      </NavbarLinkClientItem>

      <NavbarLinkClientItem firstSegment={firstSegment} path="players">
        Players
      </NavbarLinkClientItem>

      <NavbarLinkClientItem firstSegment={firstSegment} path="analytics">
        Analytics
      </NavbarLinkClientItem>

      <NavbarLinkClientItem
        className={cn("", {
          hidden: !isSignedIn,
        })}
        firstSegment={firstSegment}
        path="dashboard"
      >
        Dashboard
      </NavbarLinkClientItem>
    </>
  );
}
