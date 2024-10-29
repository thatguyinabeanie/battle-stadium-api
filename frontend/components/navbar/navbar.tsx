import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "~/components/nextui/client-components";

import BattleStadium from "~/components/battle-stadium";

import NavbarLinks from "~/components/navbar/navbar-links";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { auth } from "@clerk/nextjs/server";
import NavbarMobileMenu from "~/components/navbar/navbar-mobile-menu";
import Search from "./search";
import Notifications from "./notifications";
import Settings from "./settings";
import UserMenu from "./user-menu/user-menu";

export default async function NavigationBar() {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <Navbar
      isBlurred
      shouldHideOnScroll
      classNames={{
        brand: "justify-between",
        wrapper: "grid grid-cols-2 lg:grid-cols-3 min-w-full bg-transparent ",
        base: "shadow-md dark:shadow-white/20 backdrop-blur-3xl bg-transparent w-5/6",
        item: [
          "flex flex-row relative h-full items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[3px]",
          "data-[active=true]:after:rounded-full",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand className="rounded-full h-8 md:h-10">
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-2" justify="center">
        <NavbarLinks isSignedIn={!!clerkAuth?.sessionId} />
      </NavbarContent>

      <NavbarContent className="gap-0" justify="end">
        <div className="flex flex-row justify-center items-center">
          <Search />
          <Settings me={me} />
          <Notifications />
          <UserMenu isSignedIn={!!clerkAuth?.sessionId} me={me} />
          <NavbarMenuToggle className="xl:hidden" />
        </div>
      </NavbarContent>

      <NavbarMobileMenu isSignedIn={!!clerkAuth?.sessionId} me={me} />
    </Navbar>
  );
}
