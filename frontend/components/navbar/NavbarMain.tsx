import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { NavbarBrandComponent } from "./NavbarBrand";
import { NavbarSiteList } from "./NavbarSiteList";
import { NavbarSearch } from "./NavbarSearch";
import NavbarDropDownMenu from "./NavbarDropDownMenu";

import { TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const NavbarMain = () => {
  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrandComponent />
        <NavbarSiteList />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <NavbarSearch />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>

        <NavbarDropDownMenu />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />

        <NavbarDropDownMenu />
      </NavbarContent>
    </NextUINavbar>
  );
};
