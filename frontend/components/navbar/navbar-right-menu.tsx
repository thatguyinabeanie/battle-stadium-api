import { NavbarContent, NavbarMenuToggle } from "@/components/nextui/client-components";
import Settings from "@/components/navbar/settings";
import UserMenu from "@/components/navbar/user-menu/user-menu";
import { AccountMe } from "@/lib/api";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default async function NavbarRightMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarContent className="gap-0" justify="center">
      {/* TODO: <Search /> */}
      <Settings me={me} />
      {/*  TODO: <Notifications /> */}
      <UserMenu isSignedIn={isSignedIn} me={me} />
      <NavbarMenuToggle className="xl:hidden" />
    </NavbarContent>
  );
}
