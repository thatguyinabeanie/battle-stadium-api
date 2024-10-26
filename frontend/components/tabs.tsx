"use client";

import React from "react";

import { Tabs as NextUiTabs, Tab } from "@/components/nextui-use-client";
import { useSearchParamsTabState } from "@/lib/hooks/use-search-params-tab-state";

const tabs = ["dashboard", "profiles", "pokemon", "tournament_history", "settings", "admin"];

interface TabsProps<T> {
  tabs: {
    key: string;
    title: string;
  }[];
  tabContents: T;
  renderTabContent: (activeTab: string, props: T) => React.ReactNode;
}

export default function Tabs<T>(props: TabsProps<T>) {
  const { activeTab, setActiveTab, updateSearchParams } = useSearchParamsTabState(tabs, "dashboard");

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NextUiTabs
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
        {props.tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} />
        ))}
      </NextUiTabs>

      {props.renderTabContent(activeTab, props.tabContents)}
    </div>
  );
}
