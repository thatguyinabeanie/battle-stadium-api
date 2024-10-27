"use client";

import { DashboardLayoutProps } from "@/types";
import Tabs from "@/components/nextui/tabs";
import { AccountMe } from "@/lib/api";

const adminTab = { key: "admin", title: "Admin" };
const tabs = [
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "My Tours" },
  { key: "dashboard", title: "Dashboard" },
  { key: "settings", title: "Settings" },
];

interface DashboardProps extends DashboardLayoutProps {
  me: AccountMe | null | undefined;
}

export default function Dashboard(props: Readonly<DashboardProps>) {
  const tabsToRender = props.me?.admin ? [...tabs, adminTab] : tabs;

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-2">
      <Tabs renderTabContent={renderTabContent} tabContents={props} tabs={tabsToRender} />
    </div>
  );
}

function renderTabContent(activeTab: string, props: DashboardProps) {
  switch (activeTab) {
    case "profiles":
      return props.profiles;
    case "pokemon":
      return props.pokemon;
    case "tournament_history":
      return props.tournament_history;
    case "dashboard":
      return props.children;
    case "settings":
      return props.settings;
    case "admin":
      return props.admin;
    default:
      return null;
  }
}
