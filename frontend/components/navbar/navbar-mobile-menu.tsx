import { Link, NavbarMenu, NavbarMenuItem } from "~/components/nextui/client-components";

import { AccountMe } from "~/lib/api";
import NavbarMobileDashboardMenu from "./navbar-mobile-dashboard-menu";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default function NavbarMobileMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenu className="bg-transparent backdrop-blur-2xl">
      <NavbarMobileMenuItemLink label="Organizations" />
      <NavbarMobileMenuItemLink label="Tournaments" />
      <NavbarMobileMenuItemLink label="Players" />
      <NavbarMobileMenuItemLink label="Analytics" />
      <NavbarMobileMenuItemLink label="Settings" />

      <NavbarMobileDashboardMenu isSignedIn={isSignedIn} me={me} />
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
