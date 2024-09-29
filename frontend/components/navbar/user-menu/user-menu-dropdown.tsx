import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { DropdownItem, DropdownMenu, Link } from "@/components/nextui-use-client";

import { cn } from "@/lib";

interface UserMenuDropDownProps {
  admin?: boolean;
  // user: User;
  user: { firstName?: string; lastName?: string };
  isSignedIn: boolean;
}

export default function UserMenuDropDown({ admin, user, isSignedIn }: Readonly<UserMenuDropDownProps>) {
  return (
    <DropdownMenu aria-label="Profile Actions" variant="bordered">
      <DropdownItem
        key="profile"
        className={cn("", {
          hidden: !(user && isSignedIn),
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
          hidden: user && isSignedIn,
        })}
        color="success"
      >
        <SignInButton>
          <p className="font-semibold">Sign In</p>
        </SignInButton>
      </DropdownItem>

      <DropdownItem
        key="admin"
        className={cn("", {
          hidden: !(user && isSignedIn) || !admin,
        })}
      >
        <Link href="/admin">Admin</Link>
      </DropdownItem>

      <DropdownItem key="settings">
        <Link href="/settings">Settings</Link>
      </DropdownItem>

      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>

      <DropdownItem
        key="logout"
        className={cn("", {
          hidden: !(user && isSignedIn),
        })}
        color="danger"
      >
        <SignOutButton>Sign out</SignOutButton>
      </DropdownItem>
    </DropdownMenu>
  );
}
