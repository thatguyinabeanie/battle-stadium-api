"use client";

import { ReactNode, Key } from "react";

import { Tabs as NextUiTabs, SlotsToClasses, Tab } from "@/components/nextui/client-components";
import { useSearchParamsTabState } from "@/lib/hooks/use-search-params-tab-state";

const tabs = ["dashboard", "profiles", "pokemon", "tournament_history", "settings", "admin"];

interface TabsProps<T> {
  tabs: {
    key: string;
    title: string;
  }[];
  tabContents: T;
  classNames?: SlotsToClasses<"base" | "cursor" | "wrapper" | "tab" | "tabList" | "tabContent" | "panel">;
  renderTabContent: (activeTab: string, props: T) => ReactNode;
}

export default function Tabs<T>(props: Readonly<TabsProps<T>>) {
  const { activeTab, setActiveTab, updateSearchParams } = useSearchParamsTabState(tabs, "dashboard");

  const { tabList, tabContent, ...rest } = props.classNames ?? {};

  return (
    <div className={`w-full h-full flex flex-col items-center`}>
      <NextUiTabs
        aria-label="Navigation Tabs"
        classNames={{
          tabList: `relative rounded-full px-1 border-b backdrop-blur mx-8 bg-transparent border-small border-neutral-400/20 shadow-md hidden sm:flex ${tabList}`,
          tabContent: `w-fit text-default-500 ${tabContent}`,
          base: "pb-2",
          ...rest,
        }}
        radius="full"
        selectedKey={activeTab}
        onSelectionChange={(key: Key) => {
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
