import {
  NavbarItem,
  Popover,
  PopoverTrigger,
  Button,
  Badge,
  PopoverContent,
} from "~/components/nextui/client-components";
import { auth } from "@clerk/nextjs/server";

import { cn } from "~/lib";
import { Icon } from "@iconify/react/dist/iconify.js";

export default async function Notifications() {
  const { sessionId } = await auth();

  return (
    <NavbarItem
      className={cn("hidden", {
        "lg:flex": !!sessionId,
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

// // Add these imports
// import { Spinner } from "~/components/nextui/client-components";
// import { Suspense } from "react";

// // Create a new component for notification content
// async function NotificationContent () {
//   const notifications = await fetchNotifications(); // Your API call here

//   return notifications.length ? (
//     <div className="max-h-[300px] overflow-y-auto">
//       { notifications.map((notification) => (
//         <div key={ notification.id } className="p-4 border-b hover:bg-default-100">
//           { notification.message }
//         </div>
//       )) }
//     </div>
//   ) : (
//     <p className="text-center text-default-500 py-4">No new notifications</p>
//   );
// }

// // Update the PopoverContent
// <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
//   <Suspense fallback={ <Spinner className="p-4" /> }>
//     <NotificationContent />
//   </Suspense>
// </PopoverContent>
