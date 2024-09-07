import React from "react";
import { AvatarProps } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "usehooks-ts";

import { Avatar, AvatarIcon, Link } from "@/components/client";
import { cn } from "@/lib/utils";

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
  const isCompact = useMediaQuery("(max-width: 768px)");

  const session = {
    username: "roblow",
    user: {
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      image: "https://avatars.dicebear.com/api/avataaars/john-doe.svg",
      username: "roblow",
    },
  };

  const { firstName, lastName, name, username } = session?.user ?? {};

  return (
    <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
      {!session && (
        <p className="truncate text-tiny text-default-400">
          <Link aria-label="Log In" href="/login">
            Log in
          </Link>
        </p>
      )}

      {session && (
        <>
          <p className="text-small font-medium text-default-600">
            <Link aria-label="Profile Link" href="/dashboard">
              {username ?? session.username}
            </Link>
          </p>

          {(name || (firstName && lastName)) && (
            <Link aria-label="session-user-id" href="/dashboard">
              <p className="truncate text-tiny text-default-400">
                {session.user?.name ?? session.user.firstName + " " + session.user.lastName}
              </p>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default function UserAvatar() {
  const session = {
    username: "roblow",
    user: {
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      image: "https://avatars.dicebear.com/api/avataaars/john-doe.svg",
      username: "roblow",
    },
  };

  if (!session) {
    return (
      <div className="flex items-center gap-3 px-3">
        <Link href="/login">
          <DefaultAvatar isBordered aria-label="User Avatar Not Signed In" icon={<AvatarIcon />} size="sm" />
        </Link>
        <UserInfo />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-3">
      <Link href="/dashboard">
        <Avatar
          isBordered
          aria-label="User Avatar Signed In"
          icon={<AvatarIcon />}
          size="sm"
          src={session.user?.image ?? undefined}
        />
      </Link>
      <UserInfo />
    </div>
  );
}
