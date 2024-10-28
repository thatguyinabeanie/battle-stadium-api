"use client";

import NavbarLinkClientItem from "~/components/navbar/navbar-client-item";
import { usePathname } from "next/navigation";
import { cn } from "~/lib";
import { NavbarContent } from "~/components/nextui/client-components";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default function NavbarLinks({ isSignedIn }: Readonly<NavbarLinksProps>) {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];

  return (
    <NavbarContent className="hidden lg:flex gap-2" justify="center">
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
        className={cn("hidden", {
          "sm:flex": isSignedIn,
        })}
        firstSegment={firstSegment}
        path="dashboard"
      >
        Dashboard
      </NavbarLinkClientItem>
    </NavbarContent>
  );
}
