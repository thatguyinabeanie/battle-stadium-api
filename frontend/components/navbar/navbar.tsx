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

import BattleStadium from "@/components/battle-stadium";

import Breadcrumbs from "./breadcrumbs";
import UserMenu from "./user-menu/user-menu";
import Notifications from "./notifications";
import Settings from "./settings";
import Search from "./search";

export default function NavigationBar() {
  return (
    <div className="w-full bg-transparent">
      <Navbar
        isBordered
        classNames={{
          item: "data-[active=true]:text-primary ",
          wrapper: "px-4 sm:px-6",
        }}
        height="64px"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          <BattleStadium />
        </NavbarBrand>

        <NavbarItem className="hidden sm:flex">
          <Breadcrumbs />
        </NavbarItem>

        {/* Right Menu */}
        <NavbarContent className="ml-auto h-12 max-w-fit items-center gap-0" justify="end">
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
            <Link className="w-full" color="foreground" href="/analytics">
              Analytics
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/organizations">
              Organizations
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="/settings">
              Settings
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
