import { NavbarItem, Dropdown, DropdownTrigger, AvatarIcon, Avatar } from "~/components/nextui/client-components";
import UserMenuDropDown from "~/components/navbar/user-menu/user-menu-dropdown";
import { AccountMe } from "~/lib/api";
import { currentUser } from "@clerk/nextjs/server";
interface UserMenuProps {
  me?: AccountMe;
  isSignedIn: boolean;
}

async function SmartAvatar() {
  const user = await currentUser();

  if (user?.imageUrl) {
    return <Avatar aria-label="User's profile image" className="bg-transparent" size="sm" src={user.imageUrl} />;
  }

  return <Avatar aria-label="default profile image" className="bg-transparent" icon={<AvatarIcon />} size="sm" />;
}

export default async function UserMenu({ ...rest }: Readonly<UserMenuProps>) {
  return (
    <NavbarItem className="px-2">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <button className="h-8 w-8 transition-transform align-top">
            <SmartAvatar />
          </button>
        </DropdownTrigger>

        <UserMenuDropDown {...rest} />
      </Dropdown>
    </NavbarItem>
  );
}
