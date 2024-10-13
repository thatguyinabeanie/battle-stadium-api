import { NavbarItem, Dropdown, DropdownTrigger, AvatarIcon, Avatar } from "@/components/nextui-use-client";
import UserMenuDropDown from "@/components/navbar/user-menu/user-menu-dropdown";
import { currentUser } from "@clerk/nextjs/server";
import { components } from "@/lib/api/openapi-v1";

interface UserMenuProps {
  me?: components["schemas"]["AccountMe"];
}

async function SmartAvatar() {
  const user = await currentUser();

  if (user?.imageUrl) {
    return <Avatar aria-label="User's profile image" className="bg-transparent" size="sm" src={user.imageUrl} />;
  }

  return <Avatar aria-label="default profile image" className="bg-transparent" icon={<AvatarIcon />} size="sm" />;
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
        <UserMenuDropDown me={me} />
      </Dropdown>
    </NavbarItem>
  );
}
