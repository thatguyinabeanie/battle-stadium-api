"use client";

import { ChildrenProps } from "@/types";
import { Link, NavbarItem, NavbarItemProps } from "@nextui-org/react";
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
  const firstSegment = pathname.split("/")[1];

  const isActive = firstSegment?.includes(path);

  return (
    <NavbarItem className={`hover: ${className}`} isActive={isActive} {...rest}>
      <Link
        className={`flex text-inherit transition-transform duration-200 ease-in-out transform hover:scale-105`}
        href={`/${path}`}
        size={isActive ? "md" : "sm"}
      >
        {children}
      </Link>
    </NavbarItem>
  );
}
