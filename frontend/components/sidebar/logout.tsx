import { m } from "framer-motion";

import { cn } from "@/lib";

import { Button, Icon, Tooltip } from "../client";

const signOut: ((formData: FormData) => void) | undefined = (_formData) => {
  throw new Error("Function not implemented.");
};

export interface LogoutProps {
  isCompact: boolean;
}
export default function Logout({ isCompact }: Readonly<LogoutProps>) {
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
