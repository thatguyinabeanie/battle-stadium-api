import React from "react"
import { type AvatarProps } from "@nextui-org/react"
import { Avatar as NextUiAvatar, AvatarIcon, Link, Avatar } from "@/components/nextui-client-components"
import { cn } from "@/lib/utils"
import { Session } from "next-auth"

const DefaultAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, src, ...props }, ref) => (
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
  ),
)

DefaultAvatar.displayName = "DefaultAvatar"

export interface UserAvatarProps {
  isCompact?: boolean
  session: Session | null
}

// TODO: update the UserInfo component to display the user's username primarily and their name as a secondary option
function UserInfo({ isCompact, session }: UserAvatarProps) {
  return (
    <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
      {!session && (
        <p className="truncate text-tiny text-default-400">
          <Link href="/login">Log in</Link>
        </p>
      )}

      {session && (
        <>
          <p className="text-small font-medium text-default-600">
            <Link href="/profile">{session.user?.name}</Link>
          </p>

          {session.user?.id && (
            <p className="truncate text-tiny text-default-400">
              <Link href="/profile">{session.user?.id}</Link>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default function UserAvatar(props: UserAvatarProps) {
  const { session } = props
  if (!session) {
    return (
      <div className="flex items-center gap-3 px-3">
        <Link href="/login">
          <DefaultAvatar isBordered icon={<AvatarIcon />} size="sm" />
        </Link>
        <UserInfo {...props} />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 px-3">
      <Link href="/profile">
        <Avatar isBordered icon={<AvatarIcon />} size="sm" src={session.user?.image ?? undefined} />
      </Link>
      <UserInfo {...props} />
    </div>
  )
}
