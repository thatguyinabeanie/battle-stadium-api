import { NavbarBrand } from "@nextui-org/navbar";
import NextLink from "next/link";

import { Logo } from "@/components/icons";

export function NavbarBrandComponent() {
  return (
    <NavbarBrand as="li" className="gap-3 max-w-fit">
      <NextLink className="flex justify-start items-center gap-1" href="/">
        <Logo />
        <p className="font-bold text-inherit">Battle Stadium</p>
      </NextLink>
    </NavbarBrand>
  );
}
