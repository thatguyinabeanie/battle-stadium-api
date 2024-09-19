"use client";

import React from "react";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <NavbarContent className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full px-4 md:flex" justify="start">
      <NavbarItem isActive={pathname.includes("organization")}>
        <Link className="flex gap-2 text-inherit" href="/organizations">
          Organizations
        </Link>
      </NavbarItem>

      <NavbarItem isActive={pathname.includes("tournaments")}>
        <Link className="flex gap-2 text-inherit" href="/tournaments">
          Tournaments
        </Link>
      </NavbarItem>

      <NavbarItem isActive={pathname.includes("players")}>
        <Link className="flex gap-2 text-inherit" href="/players">
          Players
        </Link>
      </NavbarItem>

      <NavbarItem isActive={pathname.includes("analytics")}>
        <Link className="flex gap-2 text-inherit" href="/analytics">
          Analytics
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
}
