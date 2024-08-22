import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"

import { NavbarSearch } from "./NavbarSearch"

import { siteConfig } from "@/config/site"

interface NavbarMenuItemProps {
  item: {
    label: string
    href: string
  }
  index: number
}

const secondaryColor = (index: number) => (index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground")

function NavbarMenuItemComponent({ item, index }: Readonly<NavbarMenuItemProps>) {
  return (
    <NavbarMenuItem key={`${item}-${index}`}>
      <Link color={index === 2 ? "primary" : secondaryColor(index)} href="#" size="lg">
        {item.label}
      </Link>
    </NavbarMenuItem>
  )
}

function NavbarMenuComponent() {
  return (
    <NavbarMenu>
      <NavbarSearch />
      <div className="mx-4 mt-2 flex flex-col gap-2">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItemComponent key={`${item}-${index}`} index={index} item={item} />
        ))}
      </div>
    </NavbarMenu>
  )
}

export { NavbarMenuComponent as NavbarMenu }
