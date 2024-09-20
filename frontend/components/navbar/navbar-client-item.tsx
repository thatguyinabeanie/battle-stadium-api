"use client";

import { ChildrenProps } from "@/types";
import { NavbarItem, NavbarItemProps } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface NavbarItemClientProps extends ChildrenProps {
  path: string;
  className?: string;
}

export default function NavbarClientItem({
  path,
  children,
  className,
  ...rest
}: Readonly<NavbarItemClientProps & NavbarItemProps>) {
  const pathname = usePathname();

  return (
    <NavbarItem {...rest} className={className} isActive={pathname.includes(path)}>
      {children}
    </NavbarItem>
  );
}
