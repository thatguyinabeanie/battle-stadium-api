import { NavbarItem, Dropdown, DropdownTrigger, Badge, Avatar, AvatarIcon, useUser } from "@nextui-org/react";
import { auth, currentUser } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

import UserMenuDropDown from "./user-menu-dropdown";
import { cn } from "@/lib";

async function getMe() {
  return await BattleStadiumAPI(auth()).Users.me({
    next: {
      revalidate: 60 * 60,
      tags: ["users/me"],
    },
  });
}

const defaultImageUrl = "https://images.unsplash.com/broken";

export default async function UserMenu() {
  const user = await currentUser();

  console.log('user image', user?.imageUrl);
  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <button className="h-8 w-8 transition-transform align-top">
            <Avatar size="sm" src={ user?.imageUrl } className={ cn("", {
              hidden: !user?.imageUrl,
            }) } />

            <Avatar size="sm" icon={ <AvatarIcon /> } className={cn("", {
              hidden: user?.imageUrl,
              })} />
          </button>
        </DropdownTrigger>
        <UserMenuDropDown />
      </Dropdown>
    </NavbarItem>
  );
}
