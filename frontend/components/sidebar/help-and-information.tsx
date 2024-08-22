import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { Icon } from "../client";
import { cn } from "@/lib/utils";
export interface HelpAndInformationProps {
  isCompact: boolean;
}

export default function HelpAndInformation ({ isCompact }: HelpAndInformationProps) {
  return (
    <Tooltip content="Help & Feedback" isDisabled={ !isCompact } placement="right">
      <Button
        fullWidth
        className={ cn("justify-start truncate text-default-500 data-[hover=true]:text-foreground", {
          "justify-center": isCompact,
        }) }
        isIconOnly={ isCompact }
        startContent={
          isCompact ? null : (
            <Icon className="flex-none text-default-500" icon="solar:info-circle-line-duotone" width={ 24 } />
          )
        }
        variant="light"
      >
        { isCompact ? (
          <Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={ 24 } />
        ) : (
          "Help & Information"
        ) }
      </Button>
    </Tooltip>
  )
}
