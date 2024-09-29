import React from "react";
import NavbarLinkClientItem from "@/components/navbar/navbar-client-item";
import { cn } from "@/lib/utils";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default async function NavbarLinks({ isSignedIn }: Readonly<NavbarLinksProps>) {
  return (
    <>
      <NavbarLinkClientItem path="organizations">Organizations</NavbarLinkClientItem>

      <NavbarLinkClientItem path="tournaments">Tournaments</NavbarLinkClientItem>

      <NavbarLinkClientItem path="players">Players</NavbarLinkClientItem>

      <NavbarLinkClientItem path="analytics">Analytics</NavbarLinkClientItem>

      <NavbarLinkClientItem
        className={cn("", {
          hidden: !isSignedIn,
        })}
        path="dashboard"
      >
        Dashboard
      </NavbarLinkClientItem>
    </>
  );
}
