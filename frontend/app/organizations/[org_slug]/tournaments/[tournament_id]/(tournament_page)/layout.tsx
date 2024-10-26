"use client";

import React from "react";

import Tabs from "@/components/tabs";

const tabs = [
  { key: "details", title: "Details" },
  { key: "registrations", title: "Registrations" },
  { key: "pairings", title: "Pairings" },
  { key: "standings", title: "Standings" },
  { key: "matches", title: "Matches" },
  { key: "meta", title: "Metagame" },
];

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
  return (
    <div className="w-full h-full flex flex-col items-center">
      {props.children}

      <Tabs renderTabContent={renderTabContent} tabContents={props} tabs={tabs} />
    </div>
  );
}
