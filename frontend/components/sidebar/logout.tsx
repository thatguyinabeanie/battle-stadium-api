import { m } from "framer-motion";
import { useSession } from "next-auth/react";

import { cn } from "@/lib";
import { signOut } from "@/lib/server-actions/sign-out";

import { Button, Icon, Tooltip } from "../client";

export interface LogoutProps {
  isCompact: boolean;
}
export default function Logout({ isCompact }: LogoutProps) {
  const { status } = useSession();

  if (status === "unauthenticated") return null;

  return (
    <div
      className={cn("mt-auto flex flex-col", {
        "items-center": isCompact,
      })}
    >
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
    </div>
  );
}
