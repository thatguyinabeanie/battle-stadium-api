import { Link, NavbarMenu, NavbarMenuItem } from "~/components/nextui/client-components";

import NavbarMobileDashboardAccordionMenu from "./navbar-mobile-dashboard-accordion-menu";
import { NavbarMobileMenuProps } from "~/types";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "~/lib";

export default function NavbarMobileMenu(props: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenu className="bg-transparent flex flex-col items-center backdrop-filter-none p-0">
      <div className="flex flex-col p-4 backdrop-blur-3xl h-full w-5/6">
        <NavbarMobileDashboardAccordionMenu {...props} />
        <NavbarMobileMenuItemLink label="Organizations" />
        <NavbarMobileMenuItemLink label="Tournaments" />
        <NavbarMobileMenuItemLink label="Players" />
        <NavbarMobileMenuItemLink label="Analytics" />
        <NavbarMobileMenuItemLink label="Settings" />

        <NavbarMenuItem
          className={cn("hidden", {
            "sm:flex": props.me && props.isSignedIn,
          })}
        >
          <SignOutButton>
            <button className="px-2 text-danger">Sign out </button>
          </SignOutButton>
        </NavbarMenuItem>
      </div>
    </NavbarMenu>
  );
}

interface NavbarMobileMenuItemLinkProps {
  label: string;
  href?: string;
}

function NavbarMobileMenuItemLink({ label, href }: Readonly<NavbarMobileMenuItemLinkProps>) {
  return (
    <NavbarMenuItem>
      <Link className="text-lg px-2" color="foreground" href={href ?? `/${label.toLowerCase()}`}>
        {label}
      </Link>
    </NavbarMenuItem>
  );
}
