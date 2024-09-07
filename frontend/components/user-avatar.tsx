import React from "react";
import { AvatarProps } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";

import { Avatar, AvatarIcon, Link } from "@/components/client";
import { cn } from "@/lib/utils";
import { useSession, useUser } from "@clerk/nextjs";

function DefaultAvatar({ classNames, className, name, ...props }: Readonly<AvatarProps>) {
  return (
    <Avatar
      {...props}
      aria-label="User Avatar"
      classNames={{
        ...classNames,
        base: cn("bg-transparent border border-divider", classNames?.base, className),
        name: cn("text-default-500 text-[0.6rem] font-semibold", classNames?.name),
      }}
      getInitials={(name) => (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()}
      name={name}
    />
  );
}

function UserInfo() {
  const { isSignedIn, user, isLoaded } = useUser();
  const isCompact = useMediaQuery("(max-width: 768px)");

  return (
    <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
      {(!user || !isSignedIn) && (
        <p className="truncate text-tiny text-default-400">
          <Link aria-label="Log In" href="/sign-in">
            Sign In
          </Link>
        </p>
      )}

      {user && isSignedIn && isLoaded && (
        <>
          <p className="text-small font-medium text-default-600">
            <Link aria-label="Profile Link" href="/dashboard">
              { user.username }
            </Link>
          </p>


            <Link aria-label="session-user-id" href="/dashboard">
              <p className="truncate text-tiny text-default-400">
                {user.fullName}
              </p>
            </Link>

        </>
      )}
    </div>
  );
}

export default function UserAvatar() {
  const { isSignedIn, user } = useUser();

  if(user && isSignedIn) {
    return (
      <div className="flex items-center gap-3 px-3">
        <Link href="/dashboard">
          <Avatar
            isBordered
            aria-label="User Avatar Signed In"
            icon={ <AvatarIcon /> }
            size="sm"
            src={ user.imageUrl }
          />
        </Link>
        <UserInfo />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3">
      <Link href="/sign-in">
        <DefaultAvatar isBordered aria-label="User Avatar Not Signed In" icon={<AvatarIcon />} size="sm" />
      </Link>
      <UserInfo />
    </div>
  );
}
