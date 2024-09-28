import React from "react";
import NavbarLinkClientItem from "@/components/navbar/navbar-client-item";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function NavbarLinks() {
  const clerkAuth = auth();

  return (
    <>
      <NavbarLinkClientItem path="organizations">Organizations</NavbarLinkClientItem>

      <NavbarLinkClientItem path="tournaments">Tournaments</NavbarLinkClientItem>

      <NavbarLinkClientItem path="players">Players</NavbarLinkClientItem>

      <NavbarLinkClientItem path="analytics">Analytics</NavbarLinkClientItem>

      <NavbarLinkClientItem
        className={cn("", {
          hidden: !clerkAuth.sessionId,
        })}
        path="dashboard"
      >
        Dashboard
      </NavbarLinkClientItem>
    </>
  );
}
