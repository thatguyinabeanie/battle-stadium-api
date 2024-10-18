"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { components } from "@/lib/api/openapi-v1";
import { Tabs, Tab } from "@/components/nextui-use-client";
import { cn } from "@/lib";
import { DashboardLayoutProps } from "@/types";

interface DashboardProps extends DashboardLayoutProps {
  me: components["schemas"]["AccountMe"] | null | undefined;
}

const tabs = ["dashboard", "profiles", "pokemon", "tournament_history", "settings", "admin"];

export default function Dashboard(props: Readonly<DashboardProps>) {
  const { me, children, admin, profiles, settings, tournament_history, pokemon } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const tabStr = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState((tabs.includes(`${tabStr}`) && tabStr) || "dashboard");

  const updateSearchParams = React.useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

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
        <Tab key="profiles" title="Profiles">
          {profiles}
        </Tab>

        <Tab key="pokemon" title="Pokemon">
          {pokemon}
        </Tab>

        <Tab key="tournaments" title="My Tours">
          {tournament_history}
        </Tab>

        <Tab key="dashboard" title="Dashboard">
          {children}
        </Tab>

        <Tab key="settings" title="Settings">
          {settings}
        </Tab>

        {me?.admin && (
          <Tab
            key="admin"
            className={cn("", {
              hidden: !me.admin,
            })}
            title="Admin"
          >
            {admin}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
