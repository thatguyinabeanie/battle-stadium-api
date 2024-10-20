"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Tabs, Tab } from "@/components/nextui-use-client";

const tabs = ["meta", "standings", "pairings", "matches"];

interface OrganizationTournamentsTournamentLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  standings: React.ReactNode;
  pairings: React.ReactNode;
  matches: React.ReactNode;
  metagame: React.ReactNode;
}

export default function OrganizationTournamentsTournamentLayout(props: OrganizationTournamentsTournamentLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabStr = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState((tabs.includes(`${tabStr}`) && tabStr) || "pairings");

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
      {props.children}
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
        <Tab key="meta" title="Metagame">
          {props.metagame}
        </Tab>
        <Tab key="standings" title="Standings">
          {props.standings}
        </Tab>
        <Tab key="pairings" title="Pairings">
          {props.pairings}
        </Tab>
        <Tab key="matches" title="Matches">
          {props.matches}
        </Tab>
      </Tabs>
    </div>
  );
}
