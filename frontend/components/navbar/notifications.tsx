import { NavbarItem, Popover, PopoverTrigger, Button, Badge, PopoverContent } from "@nextui-org/react";
import { auth } from "@clerk/nextjs/server";

import { cn } from "@/lib";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Notifications() {
  const { sessionId } = auth();

  return (
    <NavbarItem
      className={cn("", {
        hidden: !sessionId,
      })}
    >
      <Popover offset={12} placement="bottom-end">
        <PopoverTrigger>
          <Button disableRipple isIconOnly className="overflow-visible" radius="full" variant="light">
            <Badge color="danger" content="5" showOutline={false} size="sm">
              <Icon className="text-default-500" icon="solar:bell-linear" width={22} />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
          <p className="text-center text-default-500 py-4">See all notifications</p>
        </PopoverContent>
      </Popover>
    </NavbarItem>
  );
}
