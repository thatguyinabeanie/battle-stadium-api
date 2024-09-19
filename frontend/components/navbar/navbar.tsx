import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";

import NavbarLinks from "./navbar-links";
import UserMenu from "./user-menu/user-menu";
import Settings from "./settings";
import Notifications from "./notifications";
import Search from "./search";

import BattleStadium from "@/components/battle-stadium";

export default function NavigationBar() {
  return (
    <Navbar
      isBordered
      classNames={{
        base: "w-full bg-transparent",
        content: "w-full",
        item: "data-[active=true]:text-primary",
      }}
      height="3.5rem"
    >
      <NavbarBrand>
        <BattleStadium />
      </NavbarBrand>

      <NavbarLinks />

      {/* Right Menu */}
      <NavbarContent className="ml-auto h-12 items-center gap-0" justify="end">
        <Search />
        <Settings />
        <Notifications />
        <UserMenu />
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="text-right">
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

        <NavbarMenuItem>
          <Link color="foreground" href="/settings">
            Settings
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
