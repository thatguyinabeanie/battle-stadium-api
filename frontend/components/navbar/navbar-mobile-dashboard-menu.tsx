"use client";
import { AccordionItem } from "~/components/nextui/client-components";
import { Accordion, Link, NavbarMenuItem } from "@nextui-org/react";
import { cn } from "~/lib";
import { AccountMe } from "~/lib/api";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default function NavbarMobileDashboardMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenuItem className={cn("", { hidden: !(me || isSignedIn) })}>
      <Accordion>
        <AccordionItem
          key="dashboard"
          aria-label="dashboard"
          classNames={{
            base: "p-0",
            trigger: "p-0",
            content: "pb-0",
          }}
          title="Dashboard"
        >
          <div className="flex flex-col">
            <NavbarMobileDashboardMenuLink label="Profiles" />
            <NavbarMobileDashboardMenuLink label="Pokemon" />
            <NavbarMobileDashboardMenuLink label="My Tours" />
            <NavbarMobileDashboardMenuLink label="Profiles" />
            {me?.admin && isSignedIn && <NavbarMobileDashboardMenuLink label="Admin" />}
          </div>
        </AccordionItem>
      </Accordion>
    </NavbarMenuItem>
  );
}

interface NavbarMobileMenuItemLinkProps {
  label: string;
  href?: string;
}

function NavbarMobileDashboardMenuLink({ label, href }: Readonly<NavbarMobileMenuItemLinkProps>) {
  return (
    <Link color="foreground" href={href ?? `/dashboard?tab=${label.toLowerCase()}`}>
      {label}
    </Link>
  );
}
