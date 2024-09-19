import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";

import BattleStadium from "@/components/battle-stadium";

import UserMenu from "./user-menu/user-menu";
import Settings from "./settings";
import Notifications from "./notifications";
import Search from "./search";

export default function NavigationBar() {
  return (
    <Navbar
      isBordered
      classNames={{
        base: "w-full bg-transparent",
        content: "w-full",
        item: "data-[active=true]:text-primary",
      }}
      height="55px"
    >
      <NavbarBrand>
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full px-4 md:flex" justify="start">
        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/organizations">
            Organizations
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/tournaments">
            Tournaments
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/players">
            Players
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="flex gap-2 text-inherit" href="/analytics">
            Analytics
          </Link>
        </NavbarItem>
      </NavbarContent>

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
