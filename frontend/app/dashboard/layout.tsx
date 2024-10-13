import { getMe } from "@/app/server-actions/accounts/actions";
import Dashboard from "@/components/dashboard/dashboard";
import { DashboardLayoutProps } from "@/types";
import React from "react";

export default async function DashboardLayout({ children, ...rest }: DashboardLayoutProps) {
  const me = (await getMe())?.data;

  return (
    <Dashboard {...rest} me={me}>
      {children}
    </Dashboard>
  );
}