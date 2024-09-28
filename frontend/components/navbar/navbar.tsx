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

import BattleStadium from "@/components/battle-stadium";

import NavbarLinks from "./navbar-links";
import UserMenu from "./user-menu/user-menu";
import Settings from "./settings";
import Notifications from "./notifications";
import Search from "./search";

export default function NavigationBar() {
  return (
    <Navbar

      isBordered
      classNames={{
        wrapper: "bg-transparent justify-center backdrop-blur-2xl min-w-full",
        base: " bg-transparent",
        item: "data-[active=true]:text-primary",
        content: "flex-grow-0 h-12 items-center",
      }}
      height="3.5rem"
    >
      <NavbarBrand className="rounded-full h-12 flex flex-row flex-grow-0">
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent className="hidden md:flex px-4 gap-1" data-justify={"center"}>
        <NavbarLinks />
      </NavbarContent>

      {/* Right Menu */}
      <NavbarContent className="gap-1" justify="center">
        <Search />
        <Settings />
        <Notifications />
        <UserMenu />
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
