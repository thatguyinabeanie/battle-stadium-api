import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@/components/nextui-use-client";

import BattleStadium from "@/components/battle-stadium";

import NavbarLinks from "@/components/navbar/navbar-links";
import { getMe } from "@/app/server-actions/users/actions";
import { auth } from "@clerk/nextjs/server";
import NavbarRightMenu from "@/components/navbar/navbar-right-menu";
import NavbarMobileMenu from "@/components/navbar/navbar-mobile-menu";

const navbarClassNames = {
  wrapper: "bg-transparent justify-between md:justify-around backdrop-blur min-w-full shadow-md ",
  base: "bg-transparent border-b-small border-neutral-400/50",
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
};

export default async function NavigationBar() {
  const clerkAuth = auth();
  const me = (await getMe())?.data;

  return (
    <Navbar shouldHideOnScroll classNames={navbarClassNames} height="3.5rem">
      <NavbarBrand className="rounded-full h-12 flex flex-row flex-grow-0">
        <BattleStadium />
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-2 m-x4" data-justify={"center"}>
        <NavbarLinks isSignedIn={!!clerkAuth?.sessionId} />
      </NavbarContent>

      {/* Right Menu */}
      <NavbarRightMenu me={me} />

      {/* Mobile Menu */}
      <NavbarMobileMenu />
    </Navbar>
  );
}
