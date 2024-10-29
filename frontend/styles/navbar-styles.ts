import type { SlotsToClasses } from "@nextui-org/react";

export const navbarClassNames: SlotsToClasses<"menu" | "base" | "content" | "wrapper" | "toggle" | "srOnly" | "toggleIcon" | "brand" | "item" | "menuItem"> | undefined
  = {
  brand: "justify-between",
  wrapper: "grid grid-cols-2 lg:grid-cols-3 min-w-full bg-transparent ",
  base: "shadow-md dark:shadow-white/20 backdrop-blur-3xl bg-transparent w-5/6",
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
}
