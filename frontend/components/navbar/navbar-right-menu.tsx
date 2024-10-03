import { components } from "@/lib/api/openapi-v1";
import { NavbarContent, NavbarMenuToggle } from "../nextui-use-client";
import Notifications from "./notifications";
import Search from "./search";
import Settings from "./settings";
import UserMenu from "./user-menu/user-menu";
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
