"use client";

import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { DropdownItem, DropdownMenu, Link } from "~/components/nextui/client-components";

import { cn } from "~/lib";
import { components } from "~/lib/api/openapi-v1";

interface UserMenuDropDownProps {
  me?: components["schemas"]["AccountMe"];
  isSignedIn: boolean;
}

export default function UserMenuDropDown({ me, isSignedIn }: Readonly<UserMenuDropDownProps>) {
  return (
    <DropdownMenu aria-label="Profile Actions" variant="bordered">
      <DropdownItem
        key="profile"
        aria-label="dashboard"
        className={cn("hidden", { "sm:flex": me && isSignedIn })}
        color="primary"
      >
        <Link aria-label="dashboard" href="/dashboard">
          <span>
            <p className="font-normal text-default-400">Signed in as</p>
            <p className="truncate font-semibold">{`${me?.first_name} ${me?.last_name}`}</p>{" "}
          </span>
        </Link>
      </DropdownItem>

      <DropdownItem
        key="sign-in"
        aria-label="sign-in"
        className={cn("", {
          hidden: isSignedIn,
        })}
        color="success"
      >
        <SignInButton>
          <p className="font-semibold">Sign In</p>
        </SignInButton>
      </DropdownItem>

      <DropdownItem
        key="admin"
        aria-label="Admin"
        className={cn("", {
          hidden: !(me && isSignedIn) || !me.admin,
        })}
      >
        <Link href="/dashboard?tab=admin">Admin</Link>
      </DropdownItem>

      <DropdownItem
        key="settings"
        aria-label="Settings"
        className={cn("", {
          hidden: !(me && isSignedIn),
        })}
      >
        <Link href="/dashboard?tab=settings">Settings</Link>
      </DropdownItem>

      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>

      <DropdownItem
        key="logout"
        aria-label="Sign Out"
        className={cn("", {
          hidden: !(me && isSignedIn),
        })}
        color="danger"
      >
        <SignOutButton>Sign out</SignOutButton>
      </DropdownItem>
    </DropdownMenu>
  );
}
