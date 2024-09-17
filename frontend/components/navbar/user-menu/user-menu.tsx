import { NavbarItem, Dropdown, DropdownTrigger, Avatar, AvatarIcon } from "@nextui-org/react";

import { cn } from "@/lib";

import UserMenuDropDown from "./user-menu-dropdown";

export default async function UserMenu() {
  const currentUser = await import("@clerk/nextjs/server").then((mod) => mod.currentUser);
  const user = await currentUser();

  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <button className="h-8 w-8 transition-transform align-top">
            <Avatar
              className={cn("bg-transparent", {
                hidden: !user?.imageUrl,
              })}
              icon={!user?.imageUrl && <AvatarIcon />}
              size="sm"
              src={user?.imageUrl || undefined}
            />
          </button>
        </DropdownTrigger>
        <UserMenuDropDown />
      </Dropdown>
    </NavbarItem>
  );
}
