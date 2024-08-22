import { NavbarItem } from "@nextui-org/navbar";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { Link as NextLink } from "@nextui-org/link";

import { siteConfig } from "@/config/site";

export function NavbarSiteList() {
  return (
    <ul className="hidden lg:flex gap-4 justify-start ml-2">
      {siteConfig.navItems.map((item) => (
        <NavbarItem key={item.href}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary data-[active=true]:font-medium",
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
}
