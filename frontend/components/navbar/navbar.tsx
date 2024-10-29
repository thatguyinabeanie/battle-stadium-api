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
import { navbarClassNames } from "~/styles/navbar-styles";

export default async function NavigationBar() {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <Navbar isBlurred shouldHideOnScroll classNames={navbarClassNames}>
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
