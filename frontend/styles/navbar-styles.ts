import type { SlotsToClasses } from "@nextui-org/react";

type NavbarSlots = "menu" | "base" | "content" | "wrapper" | "toggle" | "srOnly" | "toggleIcon" | "brand" | "item" | "menuItem"
export const navbarClassNames: SlotsToClasses<NavbarSlots> = {
  brand: "justify-between",
  wrapper: "flex flex-row min-w-full backdrop-blur",
  base: "border-b-1 border-neutral-400/20 backdrop-blur",
  item: [
    "flex flex-row relative h-full items-center",
    "data-[active=true]:after:content-['']",
    "data-[active=true]:after:absolute",
    "data-[active=true]:after:bottom-0",
    "data-[active=true]:after:left-0",
    "data-[active=true]:after:right-0",
    "data-[active=true]:after:h-[3px]",
    "data-[active=true]:after:rounded-full",
    "data-[active=true]:after:bg-primary",
  ],
};
