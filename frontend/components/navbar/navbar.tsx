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
  Button,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import UserMenu from "./user-menu/user-menu";
import Notifications from "./notifications";
import Settings from "./settings";
import Search from "./search";

import BattleStadium from "@/components/battle-stadium";

export default function NavigationBar() {
  return (
    <Navbar
      isBlurred
      isBordered
      shouldHideOnScroll
      classNames={{
        base: "lg:bg-transparent lg:backdrop-blur-sm flex justify-center ",
        item: "data-[active=true]:text-primary ",
        wrapper: "px-4 sm:px-6",
      }}
      height="64px"
      maxWidth="2xl"
    >
      <NavbarBrand>
        <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
        <BattleStadium />

        <NavbarContent className="ml-4 hidden h-12 w-full max-w-fit gap-4 rounded-full bg-content2 px-4 dark:bg-content1 lg:flex">
          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="/dashboard">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current="page" className="flex gap-2 text-inherit" href="/organizations">
              Organizations
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link aria-current="page" className="flex gap-2 text-inherit" href="/tournaments">
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

          <NavbarItem>
            <Link className="flex gap-2 text-inherit" href="/settings">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarBrand>

      {/* Right Menu */}
      <NavbarContent className="ml-auto h-12 items-center gap-0" data-justify="center">
        <Search />

        <NavbarItem className="hidden lg:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon className="text-default-500" icon="solar:sun-linear" width={24} />
          </Button>
        </NavbarItem>

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
