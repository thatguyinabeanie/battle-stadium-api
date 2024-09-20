import React from "react";
import { NavbarContent, Link } from "@nextui-org/react";
import { auth } from "@clerk/nextjs/server";
import { BattleStadiumAPI } from "@/lib/api";
import NavbarClientItem from "@/components/navbar/navbar-client-item";
import { cn } from "@/lib/utils";

async function getMe() {
  return (await BattleStadiumAPI(auth()).Users.me()).data;
}

export default async function NavbarLinks() {
  const { sessionId } = auth();
  const me = sessionId ? await getMe() : null;

  return (
    <NavbarContent className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full px-4 md:flex" justify="start">
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
          hidden: !sessionId,
        })}
        path="dashboard"
      >
        <Link className="flex gap-2 text-inherit" href="/dashboard">
          Dashboard
        </Link>
      </NavbarClientItem>

      <NavbarClientItem
        className={cn("", {
          hidden: !me?.admin,
        })}
        path="admin"
      >
        <Link className="flex gap-2 text-inherit" href="/admin">
          Admin
        </Link>
      </NavbarClientItem>
    </NavbarContent>
  );
}
