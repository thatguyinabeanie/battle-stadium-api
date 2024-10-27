import {} from "react";
import { Navbar, NavbarBrand } from "@/components/nextui/client-components";

import BattleStadium from "@/components/battle-stadium";

import NavbarLinks from "@/components/navbar/navbar-links";
import { getAccountMe } from "@/app/server-actions/accounts/actions";
import { auth } from "@clerk/nextjs/server";
import NavbarRightMenu from "@/components/navbar/navbar-right-menu";
import NavbarMobileMenu from "@/components/navbar/navbar-mobile-menu";

export default async function NavigationBar() {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <Navbar
      isBlurred
      shouldHideOnScroll
      classNames={{
        wrapper:
          "flex flex-row gap-8 rounded-full border-small border-neutral-500/40 backdrop-blur-3xl shadow-white mt-4",
        base: "flex w-fit h-fit rounded-full ",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
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
      height="3.5rem"
    >
      <NavbarBrand className="rounded-full h-12 flex flex-row">
        <BattleStadium />
      </NavbarBrand>

      <NavbarLinks isSignedIn={!!clerkAuth?.sessionId} />

      {/* Right Menu */}
      <NavbarRightMenu isSignedIn={!!clerkAuth?.sessionId} me={me} />

      {/* Mobile Menu */}
      <NavbarMobileMenu isSignedIn={!!clerkAuth?.sessionId} me={me} />
    </Navbar>
  );
}
