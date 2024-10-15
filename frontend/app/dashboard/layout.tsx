import React from "react";
export const runtime = "edge";

import { DashboardLayoutProps } from "@/types";
import { getAccountsMe } from "@/app/server-actions/accounts/actions";
import Dashboard from "@/components/dashboard/dashboard";

export default async function DashboardLayout({ children, ...rest }: Readonly<DashboardLayoutProps>) {
  const me = (await getAccountsMe())?.data;

  return (
    <Dashboard {...rest} me={me}>
      {children}
    </Dashboard>
  );
}
