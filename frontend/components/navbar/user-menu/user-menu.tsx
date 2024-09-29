import { NavbarItem, Dropdown, DropdownTrigger, AvatarIcon, Avatar } from "@/components/nextui-use-client";
import UserMenuDropDown from "./user-menu-dropdown";
import { currentUser } from "@clerk/nextjs/server";
import { components } from "@/lib/api/openapi-v1";

async function SmartAvatar() {
  const user = await currentUser();

  if (user?.imageUrl) {
    return <Avatar className="bg-transparent" size="sm" src={user.imageUrl} />;
  }

  return <Avatar className="bg-transparent" icon={<AvatarIcon />} size="sm" />;
}

interface UserMenuProps {
  me?: components["schemas"]["UserMe"];
}

export default async function UserMenu({ me }: Readonly<UserMenuProps>) {
  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <button className="h-8 w-8 transition-transform align-top">
            <SmartAvatar />
          </button>
        </DropdownTrigger>
        <UserMenuDropDown
          admin={me?.admin}
          isSignedIn={!!me}
          user={{ firstName: me?.first_name, lastName: me?.last_name }}
        />
      </Dropdown>
    </NavbarItem>
  );
}
