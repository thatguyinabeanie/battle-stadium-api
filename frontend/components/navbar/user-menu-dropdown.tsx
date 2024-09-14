"use client";

import { auth } from "@clerk/nextjs/server";
import { Button, DropdownItem, DropdownMenu, Link } from "@nextui-org/react";


export default function UserMenuDropDown() {



  return (
    <DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem key="profile" className="h-14 gap-2">
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">johndoe@example.com</p>
      </DropdownItem>

      <DropdownItem key="settings">
        <Link href="/settings">
        My Settings
        </Link>
      </DropdownItem>

      <DropdownItem key="analytics">
        <Link href="/analytics">
        Analytics
        </Link>
      </DropdownItem>


      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
      <DropdownItem key="logout" color="danger">
        Log Out
      </DropdownItem>
    </DropdownMenu>
  )
}
