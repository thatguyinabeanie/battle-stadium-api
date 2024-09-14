import { NavbarItem, Dropdown, DropdownTrigger, Badge, Avatar, useUser } from "@nextui-org/react";
import UserMenuDropDown from "./user-menu-dropdown";
import { auth } from "@clerk/nextjs/server";
import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

async function getMe () {
  return await BattleStadiumAPI(auth()).Users.me({
    next: {
      revalidate: 60 * 60,
      tags: ["users/me"],
    },
  });
}

const defaultImageUrl = "https://i.pravatar.cc/150?u=a04258114e29526708c";

const getBadge = async () => {
  const authObj = auth();
  const sessionId = authObj.sessionId;

  const { data: me } = await getMe();
  if(sessionId && me?.image_url) {
    return (
      <Badge color="success" content="" placement="bottom-right" shape="circle">
        <Avatar size="sm" src={ me.image_url }></Avatar>
      </Badge>
    )
  }

  return (
    <Badge color="success" content="" placement="bottom-right" shape="circle">
      <Avatar size="sm" src={ defaultImageUrl } />
    </Badge>
  )
}

export default function UserMenu() {
  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <button className="mt-1 h-8 w-8 transition-transform">
            {getBadge()}
          </button>
        </DropdownTrigger>
        <UserMenuDropDown />
      </Dropdown>
    </NavbarItem>
  );
}
