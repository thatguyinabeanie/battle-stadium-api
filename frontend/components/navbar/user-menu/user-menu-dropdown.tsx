"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Divider, DropdownItem, DropdownMenu, Link } from "@nextui-org/react";

import { cn } from "@/lib";

interface UserMenuDropDownProps {
  admin?: boolean;
}

export default function UserMenuDropDown({ admin }: Readonly<UserMenuDropDownProps>) {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <DropdownMenu aria-label="Profile Actions" variant="bordered">
      <DropdownItem
        key="profile"
        className={cn("", {
          hidden: !(user && isSignedIn) || !isLoaded,
        })}
        color="success"
      >
        <Link href="/dashboard">
          <span>
            <p className="font-normal text-default-400">Signed in as</p>
            <p className="truncate font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>{" "}
          </span>
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

      <DropdownItem key="divider" disa>
        <Divider />
      </DropdownItem>

      <DropdownItem
        key="admin"
        className={cn("", {
          hidden: !(user && isSignedIn) || !isLoaded || !admin,
        })}
        color="success"
      >
        <Link href="/admin">Admin</Link>
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
