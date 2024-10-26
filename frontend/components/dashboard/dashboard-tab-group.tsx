"use client";

import React from "react";

import { components } from "@/lib/api/openapi-v1";
import { Tabs, Tab } from "@/components/nextui-use-client";
import { cn } from "@/lib";
import { DashboardLayoutProps } from "@/types";
import { useSearchParamsTabState } from "@/lib/hooks/use-search-params-tab-state";

interface DashboardProps extends DashboardLayoutProps {
  me: components["schemas"]["AccountMe"] | null | undefined;
}

const tabs = ["dashboard", "profiles", "pokemon", "tournament_history", "settings", "admin"];

function renderTabContent(activeTab: string, props: Readonly<DashboardProps>) {
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

export default function Dashboard(props: Readonly<DashboardProps>) {
  const { activeTab, setActiveTab, updateSearchParams } = useSearchParamsTabState(tabs, "dashboard");

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Tabs
        aria-label="Navigation Tabs"
        classNames={{
          tabList:
            "relative rounded-full px-1 border-b backdrop-blur mx-8 bg-transparent border-small border-neutral-400/20 shadow-md hidden sm:flex",
          tabContent: "w-fit text-default-500",
        }}
        radius="full"
        selectedKey={activeTab}
        onSelectionChange={(key: React.Key) => {
          setActiveTab(key.toString());
          updateSearchParams({ tab: key.toString() });
          updateSearchParams({ tab: key.toString() });
        }}
      >
        <Tab key="profiles" title="Profiles" />
        <Tab key="pokemon" title="Pokemon" />
        <Tab key="tournaments" title="My Tours" />
        <Tab key="dashboard" title="Dashboard" />
        <Tab key="settings" title="Settings" />

        {props.me?.admin && (
          <Tab
            key="admin"
            className={cn("", {
              hidden: !props.me.admin,
            })}
            title="Admin"
          />
        )}
      </Tabs>

      {renderTabContent(activeTab, props)}
    </div>
  );
}
