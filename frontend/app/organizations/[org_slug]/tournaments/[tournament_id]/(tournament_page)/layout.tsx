"use client";

import React from "react";

import { Tabs, Tab } from "@/components/nextui-use-client";
import { useSearchParamsTabState } from "@/lib/hooks/use-search-params-tab-state";

const tabs = ["meta", "standings", "pairings", "matches", "registrations", "details"];

interface OrganizationTournamentsTournamentLayoutProps {
  children: React.ReactNode;
  standings: React.ReactNode;
  pairings: React.ReactNode;
  matches: React.ReactNode;
  metagame: React.ReactNode;
  registrations: React.ReactNode;
  details: React.ReactNode;
}

function renderTabContent(activeTab: string, props: Readonly<OrganizationTournamentsTournamentLayoutProps>) {
  switch (activeTab) {
    case "details":
      return props.details;
    case "registrations":
      return props.registrations;
    case "pairings":
      return props.pairings;
    case "standings":
      return props.standings;
    case "matches":
      return props.matches;
    case "meta":
      return props.metagame;
    default:
      return null;
  }
}

export default function OrganizationTournamentsTournamentLayout(
  props: Readonly<OrganizationTournamentsTournamentLayoutProps>,
) {
  const { activeTab, setActiveTab, updateSearchParams } = useSearchParamsTabState(tabs, "details");

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Tabs
        aria-label="Organization Tournament Tabs"
        classNames={{
          tabList:
            "relative rounded-full px-1 border-b backdrop-blur mx-8 bg-transparent border-small border-neutral-400/20 shadow-md hidden sm:flex mb-4",
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
        <Tab key="details" title="Details" />
        <Tab key="registrations" title="Registrations" />

        <Tab key="pairings" title="Pairings" />
        <Tab key="standings" title="Standings" />
        <Tab key="matches" title="Matches" />
        <Tab key="meta" title="Metagame" />
      </Tabs>

      {renderTabContent(activeTab, props)}
    </div>
  );
}
