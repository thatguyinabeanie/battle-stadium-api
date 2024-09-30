import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@/components/nextui-use-client";

import BattleStadium from "@/components/battle-stadium";

import NavbarLinks from "./navbar-links";
import UserMenu from "./user-menu/user-menu";
import Settings from "./settings";
import Notifications from "./notifications";
import Search from "./search";
import { getMe } from "@/app/data/actions";
import { auth } from "@clerk/nextjs/server";

export default async function NavigationBar() {
  const me = (await getMe()).data;
  const clerkAuth = auth();

  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "bg-transparent justify-between backdrop-blur-md min-w-full",
        base: "bg-transparent",
        item: "data-[active=true]:text-primary",
        content: "flex-grow-0 h-12 items-center text-default-500",
      }}
      height="3.5rem"
    >
      <NavbarBrand className="rounded-full h-12 flex flex-row flex-grow-0">
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-2 m-x4" data-justify={"center"}>
        <NavbarLinks isSignedIn={!!clerkAuth.sessionId} />
      </NavbarContent>

      {/* Right Menu */}
      <NavbarContent className="gap-0" justify="center">
        <Search />
        <Settings />
        <Notifications />
        <UserMenu me={me} />
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="text-right bg-transparent backdrop-blur-2xl">
        <NavbarMenuItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color="foreground" href="/organizations">
            Organizations
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color="foreground" href="/tournaments">
            Tournaments
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color="foreground" href="/players">
            Players
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color="foreground" href="/analytics">
            Analytics
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
