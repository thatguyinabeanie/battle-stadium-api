"use client";

import { usePathname } from "next/navigation";
import { cn } from "~/lib";
import { NavbarItem, NavbarItemProps } from "../nextui/client-components";
import Link from "next/link";
import { ChildrenProps } from "~/types";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default function NavbarLinks({ isSignedIn }: Readonly<NavbarLinksProps>) {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];

  return (
    <>
      <NavbarClientLink firstSegment={firstSegment} path="organizations">
        Organizations
      </NavbarClientLink>

      <NavbarClientLink firstSegment={firstSegment} path="tournaments">
        Tournaments
      </NavbarClientLink>

      <NavbarClientLink firstSegment={firstSegment} path="players">
        Players
      </NavbarClientLink>

      <NavbarClientLink firstSegment={firstSegment} path="analytics">
        Analytics
      </NavbarClientLink>

      <NavbarClientLink
        className={cn("hidden", {
          "sm:flex": isSignedIn,
        })}
        firstSegment={firstSegment}
        path="dashboard"
      >
        Dashboard
      </NavbarClientLink>
    </>
  );
}
interface NavbarItemClientProps extends ChildrenProps {
  path: string;
  className?: string;
  firstSegment?: string;
}
const LINK_CLASSNAME = "flex text-lg transition-transform duration-200 ease-in-out transform hover:scale-105 text-primary";
function NavbarClientLink ({
  path,
  children,
  className,
  firstSegment,
  ...rest
}: Readonly<NavbarItemClientProps & NavbarItemProps>) {
  const isActive = firstSegment?.includes(path);

  return (
    <NavbarItem className={ `${className}` } isActive={ isActive } { ...rest }>
      <Link className={ LINK_CLASSNAME } href={ `/${path}` }>
        { children }
      </Link>
    </NavbarItem>
  );
}
