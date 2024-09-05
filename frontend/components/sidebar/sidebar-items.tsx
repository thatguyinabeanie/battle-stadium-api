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
        key: "dashboard",
        href: "/dashboard",
        icon: "mage:dashboard-chart-arrow",
        icon_selected: "mage:dashboard-chart-arrow-fill",
        title: "Dashboard",
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
        title: "Tournaments",
      },
      {
        key: "analytics",
        href: "/analytics",
        icon: "solar:analytics-outline",
        title: "Analytics",
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
