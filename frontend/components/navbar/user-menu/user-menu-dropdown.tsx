"use client";

import { cn } from "@/lib";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { DropdownItem, DropdownMenu, Link } from "@nextui-org/react";

export default function UserMenuDropDown() {
  const {user, isSignedIn, isLoaded} = useUser();

  return (
    <DropdownMenu aria-label="Profile Actions" variant="bordered" className="w-100">

      <DropdownItem key="profile" color="success" className={
        cn("", {
          hidden: !(user && isSignedIn) || !isLoaded,
        })}>
          <Link  href="/dashboard">
            <p>Signed in as <p className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</p> </p>
          </Link>
      </DropdownItem>

        <DropdownItem key="sign-in" color="success" className={cn("", {
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
