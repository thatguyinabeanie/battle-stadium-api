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
  { label: "Profiles" },
  { label: "My Tours", href: "/dashboard?tab=tournaments" },
  { label: "Organizations" },
  { label: "Players" },
  { label: "Analytics" },
  { label: "Settings" },
];

export default function NavbarMobileDashboardMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenuItem className={cn("", { hidden: !(me || isSignedIn) })}>
      <Accordion>
        <AccordionItem
          key="dashboard"
          aria-description="Access your profiles, Pokemon, tours, and admin features"
          aria-label="dashboard"
          classNames={{
            base: "p-0",
            trigger: "p-0",
            content: "pb-0",
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
