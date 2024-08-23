import React from "react";
import { AvatarProps } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "usehooks-ts";

import { Avatar, AvatarIcon, Link } from "@/components/client";
import { cn } from "@/lib/utils";

const DefaultAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      {...props}
      ref={ref}
      aria-label="User Avatar"
      classNames={{
        ...classNames,
        base: cn("bg-transparent border border-divider", classNames?.base, className),
        name: cn("text-default-500 text-[0.6rem] font-semibold", classNames?.name),
      }}
      getInitials={(name) => (name[0] || "") + (name[name.lastIndexOf(" ") + 1] || "").toUpperCase()}
      name={name}
    />
  ),
);

DefaultAvatar.displayName = "DefaultAvatar";

// TODO: update the UserInfo component to display the user's username primarily and their name as a secondary option
function UserInfo() {
  const { data: session } = useSession();
  const isCompact = useMediaQuery("(max-width: 768px)");

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
            <Link aria-label="Profile Link" href="/profile">
              {session.user?.name}
            </Link>
          </p>

          {session.user?.id && (
            <p className="truncate text-tiny text-default-400">
              <Link aria-label="session-user-id" href="/profile">
                {session.user?.id}
              </Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function UserAvatar() {
  const { data: session } = useSession();

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
      <Link href="/profile">
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
