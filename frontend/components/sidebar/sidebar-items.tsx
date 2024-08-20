import TeamAvatar from "../team-avatar";

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

const yourOrganizations: SidebarItem = {
  key: "your-organizations",
  title: "Your Organizations",
  items: [
    {
      key: "nextui",
      href: "#",
      title: "NextUI",
      startContent: <TeamAvatar name="Next UI" />,
    },
    {
      key: "tailwind-variants",
      href: "#",
      title: "Tailwind Variants",
      startContent: <TeamAvatar name="Tailwind Variants" />,
    },
    {
      key: "nextui-pro",
      href: "#",
      title: "NextUI Pro",
      startContent: <TeamAvatar name="NextUI Pro" />,
    },
  ],
};

export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems,
  yourOrganizations,
];
