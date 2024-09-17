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
      isBlurred
      isBordered
      shouldHideOnScroll
      classNames={{
        content: "w-full",
        base: "lg:bg-transparent lg:backdrop-filter-none w-full",
        item: "data-[active=true]:text-primary",
      }}
      height="60px"
    >
      <NavbarBrand>
        <NavbarMenuToggle className="mr-2 h-6 xl:hidden" />
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent
        className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full bg-content2 px-4 dark:bg-content1 md:flex"
        justify="start"
      >
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
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/organizations">
            Organizations
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/tournaments">
            Tournaments
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/players">
            Players
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/analytics">
            Analytics
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/settings">
            Settings
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
