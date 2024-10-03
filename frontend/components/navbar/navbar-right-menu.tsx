import { components } from "@/lib/api/openapi-v1";
import { NavbarContent, NavbarMenuToggle } from "@/components/nextui-use-client";
import Notifications from "@/components/navbar/notifications";
import Search from "@/components/navbar/search";
import Settings from "@/components/navbar/settings";
import UserMenu from "@/components/navbar/user-menu/user-menu";
interface NavbarMobileMenuProps {
  me?: components["schemas"]["UserMe"];
}

export default async function NavbarRightMenu({ me }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarContent className="gap-0" justify="center">
      <Search />
      <Settings />
      <Notifications />
      <UserMenu me={me} />
      <NavbarMenuToggle className="md:hidden" />
    </NavbarContent>
  );
}
