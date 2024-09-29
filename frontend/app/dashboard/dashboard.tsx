"use client";
import { components } from "@/lib/api/openapi-v1";
import { Tabs, Tab, Chip } from "@/components/nextui-use-client";
import { cn } from "@/lib";

interface DashboardProps {
  me: components["schemas"]["UserMe"];
}
export default function Dashboard({ me }: Readonly<DashboardProps>) {
  return (
    <Tabs
      aria-label="Navigation Tabs"
      classNames={{
        tabList:
          "w-full relative rounded-full px-1 border-b backdrop-blur-lg mx-8 bg-transparent border-small border-neutral-400/20 shadow-md",
        tab: "border-none text-primary",
        tabContent: "text-default-500",
      }}
      radius="full"
      variant="light"
    >
      <Tab key="dashboard" title="Dashboard" />
      <Tab
        key="deployments"
        title={
          <div className="flex items-center gap-1">
            <p>Deployments</p>
            <Chip size="sm">9</Chip>
          </div>
        }
      />
      <Tab key="settings" title="Settings" />
      <Tab
        key="admin"
        className={cn("", {
          hidden: !me.admin,
        })}
        title="Admin"
      />
    </Tabs>
  );
}
