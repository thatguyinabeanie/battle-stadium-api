"use client";

import type { AvatarProps } from "@nextui-org/react";

import React from "react";

import {
  Avatar as NextUiAvatar,
  AvatarIcon,
} from "@/components/nextui-client-components";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/context/current-user";

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <NextUiAvatar
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          "bg-transparent border border-divider",
          classNames?.base,
          className,
        ),
        name: cn(
          "text-default-500 text-[0.6rem] font-semibold",
          classNames?.name,
        ),
      }}
      getInitials={(name) =>
        (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()
      }
      name={name}
      radius="md"
      size="sm"
    />
  ),
);

Avatar.displayName = "Avatar";

export interface UserAvatarProps {
  isCompact?: boolean;
}

const UserAvatar = ({ isCompact }: UserAvatarProps) => {
  const currentUser = useCurrentUser();

  return (
    <div className="flex items-center gap-3 px-3">
      <Avatar isBordered icon={<AvatarIcon />} size="sm" />
      <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
        <p className="truncate text-small font-medium text-default-600">
          {currentUser?.username}
        </p>

        <p className="truncate text-tiny text-default-400">
          {currentUser?.firstName} {currentUser?.lastName}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
