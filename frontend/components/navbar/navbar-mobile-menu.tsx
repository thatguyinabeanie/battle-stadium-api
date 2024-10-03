import { Link, NavbarMenu, NavbarMenuItem } from "@/components/nextui-use-client";

export default async function NavbarMobileMenu() {
  return (
    <NavbarMenu className="text-right bg-transparent backdrop-blur-2xl">
      <NavbarMenuItem>
        <Link color="foreground" href="/dashboard">
          Dashboard
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link color="foreground" href="/organizations">
          Organizations
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link color="foreground" href="/tournaments">
          Tournaments
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link color="foreground" href="/players">
          Players
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link color="foreground" href="/analytics">
          Analytics
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link color="foreground" href="/settings">
          Settings
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
