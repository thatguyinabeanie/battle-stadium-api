"use client";

import { Accordion, AccordionItem, Link, NavbarMenu, NavbarMenuItem } from "@/components/nextui/client-components";
import { cn } from "@/lib";
import { AccountMe } from "@/lib/api";

interface NavbarMobileMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

export default function NavbarMobileMenu({ me, isSignedIn }: Readonly<NavbarMobileMenuProps>) {
  return (
    <NavbarMenu className="bg-transparent backdrop-blur-2xl">
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
              <Link color="foreground" href="/dashboard?tab=profiles">
                Profiles
              </Link>

              <Link color="foreground" href="/dashboard?tab=pokemon">
                Pokemon
              </Link>

              <Link color="foreground" href="/dashboard?tab=tournaments">
                My Tours
              </Link>

              <Link color="foreground" href="/dashboard?tab=settings">
                Settings
              </Link>
              {me?.admin && isSignedIn && (
                <Link color="foreground" href="/dashboard?tab=admin">
                  Admin
                </Link>
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link className="text-lg px-2" color="foreground" href="/organizations">
          Organizations
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link className="text-lg px-2" color="foreground" href="/tournaments">
          Tournaments
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link className="text-lg px-2" color="foreground" href="/players">
          Players
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link className="text-lg px-2" color="foreground" href="/analytics">
          Analytics
        </Link>
      </NavbarMenuItem>

      <NavbarMenuItem>
        <Link className="text-lg px-2" color="foreground" href="/settings">
          Settings
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}
