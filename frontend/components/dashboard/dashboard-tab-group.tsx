"use client";

import React from "react";

import { components } from "@/lib/api/openapi-v1";
import { DashboardLayoutProps } from "@/types";
import TabComponent from "../tabs";

interface DashboardProps extends DashboardLayoutProps {
  me: components["schemas"]["AccountMe"] | null | undefined;
}

const tabs = [
  { key: "profiles", title: "Profiles" },
  { key: "pokemon", title: "Pokemon" },
  { key: "tournaments", title: "My Tours" },
  { key: "dashboard", title: "Dashboard" },
  { key: "settings", title: "Settings" },
  { key: "admin", title: "Admin" },
];

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

export default function Dashboard(props: DashboardProps) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <TabComponent renderTabContent={renderTabContent} tabContents={props} tabs={tabs} />
    </div>
  );
}
