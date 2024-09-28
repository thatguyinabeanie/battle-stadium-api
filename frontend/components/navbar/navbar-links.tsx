import React from "react";
import { Link } from "@nextui-org/react";
import NavbarClientItem from "@/components/navbar/navbar-client-item";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function NavbarLinks() {
  const clerkAuth = auth();

  return (
    <>
      <NavbarClientItem path="organizations">
        <Link className="flex gap-2 text-inherit" href="/organizations">
          Organizations
        </Link>
      </NavbarClientItem>

      <NavbarClientItem path="tournaments">
        <Link className="flex gap-2 text-inherit" href="/tournaments">
          Tournaments
        </Link>
      </NavbarClientItem>

      <NavbarClientItem path="players">
        <Link className="flex gap-2 text-inherit" href="/players">
          Players
        </Link>
      </NavbarClientItem>

      <NavbarClientItem path="analytics">
        <Link className="flex gap-2 text-inherit" href="/analytics">
          Analytics
        </Link>
      </NavbarClientItem>

      <NavbarClientItem
        className={cn("", {
          hidden: !clerkAuth.sessionId,
        })}
        path="dashboard"
      >
        <Link className="flex gap-2 text-inherit" href="/dashboard">
          Dashboard
        </Link>
      </NavbarClientItem>
    </>
  );
}
