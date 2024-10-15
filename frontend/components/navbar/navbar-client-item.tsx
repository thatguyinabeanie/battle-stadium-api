"use client";

import { ChildrenProps } from "@/types";
import { Link, NavbarItem, NavbarItemProps } from "@/components/nextui-use-client";

interface NavbarItemClientProps extends ChildrenProps {
  path: string;
  className?: string;
  firstSegment?: string;
}

export default function NavbarClientItem({
  path,
  children,
  className,
  firstSegment,
  ...rest
}: Readonly<NavbarItemClientProps & NavbarItemProps>) {
  const isActive = firstSegment?.includes(path);

  const linkClassName = `flex ${isActive ? "text-lg" : "text-md"} transition-transform duration-200 ease-in-out transform hover:scale-105`;

  return (
    <NavbarItem className={`hover: ${className}`} isActive={isActive} {...rest}>
      <Link className={linkClassName} href={`/${path}`} size="sm">
        {children}
      </Link>
    </NavbarItem>
  );
}
