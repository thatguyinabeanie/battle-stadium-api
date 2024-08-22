"use client";

import { type AvatarProps } from "@nextui-org/react";

import React from "react";

import { UserMe } from "@/lib/api";
import { Avatar as NextUiAvatar, AvatarIcon, Link } from "@/components/nextui-client-components";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/context/current-user";

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(({ name, className, classNames = {}, ...props }, ref) => (
  <NextUiAvatar
    {...props}
    ref={ref}
    classNames={{
      ...classNames,
      base: cn("bg-transparent border border-divider", classNames?.base, className),
      name: cn("text-default-500 text-[0.6rem] font-semibold", classNames?.name),
    }}
    getInitials={(name) => (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()}
    name={name}
    radius="md"
    size="sm"
    aria-label="User Avatar"
  />
));

Avatar.displayName = "Avatar";

export interface UserAvatarProps {
  isCompact?: boolean;
}

export interface CurrentUserAvatarProps extends UserAvatarProps {
  currentUser: UserMe | null;
}

function UserInfo({ isCompact, currentUser }: CurrentUserAvatarProps) {
  return (
    <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
      { currentUser && <p className="truncate text-small font-medium text-default-600">{ currentUser.username }</p> }
      { !currentUser && (<p className="truncate text-tiny text-default-400">
        <Link href="/login">Log in</Link>
      </p>
      )}
      {
        currentUser && (
          <p className="truncate text-tiny text-default-400">
            { currentUser.firstName } { currentUser.lastName }
          </p>
        )
      }
    </div>
  );
};
export default function UserAvatar({ isCompact }: UserAvatarProps){
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex items-center gap-3 px-3">
        <Link href="/login">
          <Avatar isBordered icon={<AvatarIcon />} size="sm" />
        </Link>
        <UserInfo isCompact={ isCompact } currentUser={ null } />
      </div >
    );
  }

  return (
    <div className="flex items-center gap-3 px-3">
      <Avatar isBordered icon={<AvatarIcon />} size="sm" />
      <UserInfo isCompact={ isCompact } currentUser={ currentUser } />
    </div>
  );
};
