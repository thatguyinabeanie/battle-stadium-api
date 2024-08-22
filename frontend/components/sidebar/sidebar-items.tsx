import { type SidebarItem } from "./sidebar";
export const sectionItems: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      {
        key: "home",
        href: "/",
        icon: "solar:home-2-linear",
        title: "Home",
      },
      {
        key: "organization",
        href: "/organizations",
        icon: "solar:widget-2-outline",
        title: "Organizations",
      },
      {
        key: "tournaments",
        href: "/tournaments",
        icon: "solar:users-group-two-rounded-outline",
        title: "Team",
      },
      {
        key: "settings",
        href: "/settings",
        icon: "solar:settings-outline",
        title: "Settings",
      },
    ],
  },
];
