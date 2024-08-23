import { m } from "framer-motion";
import { useSession } from "next-auth/react";

import { Button, Icon, Tooltip } from "../client";

import { cn } from "@/lib";
import { signOut } from "@/lib/server-actions/sign-out";

export interface LogoutProps {
  isCompact: boolean;
}
export default function Logout({ isCompact }: LogoutProps) {
  const { data: session } = useSession();

  const expiresDate = session?.expires ? new Date(session.expires) : null;
  const isExpired = expiresDate ? expiresDate < new Date() : false;

  if (!session?.user || isExpired) return null;

  return (
    <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
      <m.form action={signOut}>
        <Button
          className={cn("justify-start text-default-500 data-[hover=true]:text-foreground", {
            "justify-center": isCompact,
          })}
          isIconOnly={isCompact}
          startContent={
            isCompact ? null : (
              <Icon
                className="flex-none rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            )
          }
          type="submit"
          variant="light"
        >
          {isCompact ? (
            <Icon className="rotate-180 text-default-500" icon="solar:minus-circle-line-duotone" width={24} />
          ) : (
            "Log Out"
          )}
        </Button>
      </m.form>
    </Tooltip>
  );
}
