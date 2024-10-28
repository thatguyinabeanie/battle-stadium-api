import { NavbarContent, NavbarMenuToggle } from "@/components/nextui/client-components";
import Settings from "@/components/navbar/settings";
import UserMenu from "@/components/navbar/user-menu/user-menu";
import { AccountMe } from "@/lib/api";
import Search from "./search";
import Notifications from "./notifications";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default async function NavbarRightMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarContent className="gap-0" justify="end">
      <Search />
      <Settings me={me} />
      <Notifications />
      <UserMenu isSignedIn={isSignedIn} me={me} />
      <NavbarMenuToggle className="xl:hidden" />
    </NavbarContent>
  );
}
