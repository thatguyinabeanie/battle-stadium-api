import { m } from "framer-motion"

import { Button, Icon, Tooltip } from "../nextui-client-components"

import { cn } from "@/lib"
import { handleSignOut } from "@/lib/server-actions/handle-sign-out"

export interface LogoutProps {
  isCompact: boolean
}
export default function Logout({ isCompact }: LogoutProps) {
  return (
    <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
      <m.form action={handleSignOut}>
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
  )
}
