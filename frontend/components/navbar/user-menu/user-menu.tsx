import { NavbarItem, Dropdown, DropdownTrigger, AvatarIcon, Avatar } from "@nextui-org/react";

import UserMenuDropDown from "./user-menu-dropdown";
import { currentUser } from "@clerk/nextjs/server";
import { getMe } from "@/app/data/actions";

async function SmartAvatar() {
  const user = await currentUser();

  if (user?.imageUrl) {
    return <Avatar className="bg-transparent" size="sm" src={user.imageUrl} />;
  }

  return <Avatar className="bg-transparent" icon={<AvatarIcon />} size="sm" />;
}

export default async function UserMenu() {
  const me = (await getMe()).data;

  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <button className="h-8 w-8 transition-transform align-top">
            <SmartAvatar />
          </button>
        </DropdownTrigger>
        <UserMenuDropDown admin={me?.admin} />
      </Dropdown>
    </NavbarItem>
  );
}
