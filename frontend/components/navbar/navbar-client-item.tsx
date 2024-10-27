"use client";

import { ChildrenProps } from "@/types";
import { Link, NavbarItem, NavbarItemProps } from "@/components/nextui/client-components";

interface NavbarItemClientProps extends ChildrenProps {
  path: string;
  className?: string;
  firstSegment?: string;
}

const linkClassName = "flex text-lg transition-transform duration-200 ease-in-out transform hover:scale-105";

export default function NavbarClientItem({
  path,
  children,
  className,
  firstSegment,
  ...rest
}: Readonly<NavbarItemClientProps & NavbarItemProps>) {
  const isActive = firstSegment?.includes(path);

  return (
    <NavbarItem className={`hover: ${className}`} isActive={isActive} {...rest}>
      <Link className={linkClassName} href={`/${path}`}>
        {children}
      </Link>
    </NavbarItem>
  );
}
