"use client";
import { AccordionItem } from "~/components/nextui/client-components";
import { Accordion, Link, NavbarMenuItem } from "@nextui-org/react";
import { cn } from "~/lib";
import { AccountMe } from "~/lib/api";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}
const NAVIGATION_ITEMS = [
  { label: "Profiles", href: "/dashboard?tab=profiles" },
  { label: "Pokemon", href: "/dashboard?tab=tournaments" },
  { label: "Tournaments" },
  { label: "Organizations" },
];

export default function NavbarMobileDashboardMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenuItem className={cn("py-0 my-0", { hidden: !(me || isSignedIn) })}>
      <Accordion defaultExpandedKeys={["dashboard"]}>
        <AccordionItem
          key="dashboard"
          aria-description="Access your profiles, Pokemon, tours, and admin features"
          aria-label="dashboard"
          classNames={{
            title: "text-primary",
            base: "p-0",
            trigger: "p-0",
            content: "px-4",
          }}
          title="Dashboard"
        >
          <div className="flex flex-col">
            {NAVIGATION_ITEMS.map((item) => (
              <NavbarMobileDashboardMenuLink key={item.label} {...item} />
            ))}

            {me?.admin && isSignedIn && <NavbarMobileDashboardMenuLink label="Admin" />}
          </div>
        </AccordionItem>
      </Accordion>
    </NavbarMenuItem>
  );
}

interface NavbarMobileDashboardMenuLinkProps {
  label: string;
  href?: string;
}

function NavbarMobileDashboardMenuLink({ label, href }: Readonly<NavbarMobileDashboardMenuLinkProps>) {
  return (
    <Link color="foreground" href={href ?? `/dashboard?tab=${label.toLowerCase()}`}>
      {label}
    </Link>
  );
}
