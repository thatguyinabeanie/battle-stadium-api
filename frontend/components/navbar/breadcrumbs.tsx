"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function BreadcrumbsComponent() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    // TODO: do some fancy parsing to make the label more human-readable
    // home => "Home"
    // /organizations/72 => "Home > Organizations > Hatterene Series"
    // /organizations/72/tournaments => "Home > Organizations > Hatterene Series > Tournaments"
    // This would require making an api call to fetch the relevant data


    return (
      <BreadcrumbItem key={href}>
        <Link href={href}>{label}</Link>
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      {breadcrumbItems}
    </Breadcrumbs>
  );
}
