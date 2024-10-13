"use client";
import { components } from "@/lib/api/openapi-v1";
import { Tabs, Tab } from "@/components/nextui-use-client";
import { cn } from "@/lib";

interface DashboardProps {
  me: components["schemas"]["UserMe"] | null | undefined;
  children?: React.ReactNode;
  admin?: React.ReactNode;
  dashboard?: React.ReactNode;
  profiles?: React.ReactNode;
  settings?: React.ReactNode;
  tournament_history?: React.ReactNode;
}

export default function Dashboard({ me, children, admin, profiles, settings, tournament_history }: DashboardProps) {
  return (
    <Tabs
      aria-label="Navigation Tabs"
      classNames={{
        tabList:
          "w-full relative rounded-full px-1 border-b backdrop-blur mx-8 bg-transparent border-small border-neutral-400/20 shadow-md",
        // tab: "border-small text-primary border-neutral-500/50",
        tabContent: "text-default-500",
      }}
      radius="full"
      variant="light"
    >
      <Tab key="dashboard" title="Dashboard">
        {children}
      </Tab>
      <Tab key="profiles" title="Profiles">
        {profiles}
      </Tab>

      <Tab key="tournament_history" title="Tournament History">
        {tournament_history}
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
  );
}
