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
        iconSelected: "mage:dashboard-chart-arrow-fill",
        title: "Dashboard",
      },
      {
        key: "organizations",
        href: "/organizations",
        icon: "material-symbols:groups-3-outline",
        iconSelected: "material-symbols:groups-3",
        title: "Organizations",
      },
      {
        key: "tournaments",
        href: "/tournaments",
        iconSelected: "mdi:trophy-variant",
        icon: "mdi:trophy-variant-outline",
        title: "Tournaments",
      },
      {
        key: "analytics",
        href: "/analytics",
        icon: "ic:outline-analytics",
        iconSelected: "ic:baseline-analytics",
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
