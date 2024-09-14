"use client";

import { cn } from "@/lib";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownItem, DropdownMenu, Link } from "@nextui-org/react";

export default function UserMenuDropDown() {
  const {user, isSignedIn, isLoaded} = useUser();

  return (
    <DropdownMenu aria-label="Profile Actions" variant="flat">

      <DropdownItem key="profile" color="primary" className={
        cn("h-14 gap-2", {
          hidden: !(user && isSignedIn) || !isLoaded,
        })}>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
      </DropdownItem>

        <DropdownItem key="profile" className={cn("", {
          hidden: user && isSignedIn && isLoaded,
        })}>
          <SignInButton>
          <p className="font-semibold">Sign In</p>
          </SignInButton>
      </DropdownItem>

      <DropdownItem key="settings">
        <Link href="/settings">My Settings</Link>
      </DropdownItem>

      <DropdownItem key="analytics">
        <Link href="/analytics">Analytics</Link>
      </DropdownItem>

      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>

      <DropdownItem key="logout" color="danger" className={ cn("", {
        "hidden": !(user && isSignedIn) || !isLoaded,
      }) }>
        <SignOutButton>
          Sign out
        </SignOutButton>
      </DropdownItem>

    </DropdownMenu>
  );
}
