import { getMe } from "@/app/data/actions";
import Dashboard from "@/components/dashboard/dashboard";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  profiles: React.ReactNode;
  tournament_history: React.ReactNode;
  settings: React.ReactNode;
}

export default async function DashboardLayout({
  children,
  profiles,
  tournament_history,
  settings,
}: DashboardLayoutProps) {
  const me = (await getMe())?.data;

  return (
    <Dashboard me={me} profiles={profiles} settings={settings} tournament_history={tournament_history}>
      {children}
    </Dashboard>
  );
}
