"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownItem, DropdownMenu, Link } from "@nextui-org/react";

import { cn } from "@/lib";

export default function UserMenuDropDown() {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <DropdownMenu aria-label="Profile Actions" className="w-100" variant="bordered">
      <DropdownItem
        key="profile"
        className={cn("", {
          hidden: !(user && isSignedIn) || !isLoaded,
        })}
        color="success"
      >
        <Link href="/dashboard">
          <p>
            Signed in as <p className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>{" "}
          </p>
        </Link>
      </DropdownItem>

      <DropdownItem
        key="sign-in"
        className={cn("", {
          hidden: user && isSignedIn && isLoaded,
        })}
        color="success"
      >
        <SignInButton>
          <p className="font-semibold">Sign In</p>
        </SignInButton>
      </DropdownItem>

      <DropdownItem key="settings">
        <Link href="/settings">Settings</Link>
      </DropdownItem>

      <DropdownItem key="analytics">
        <Link href="/analytics">Analytics</Link>
      </DropdownItem>

      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>

      <DropdownItem
        key="logout"
        className={cn("", {
          hidden: !(user && isSignedIn) || !isLoaded,
        })}
        color="danger"
      >
        <SignOutButton>Sign out</SignOutButton>
      </DropdownItem>
    </DropdownMenu>
  );
}
