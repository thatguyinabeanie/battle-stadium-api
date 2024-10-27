import { DashboardLayoutProps } from "@/types";
import { getAccountMe } from "@/app/server-actions/accounts/actions";
import Dashboard from "@/components/dashboard/dashboard-tab-group";

export default async function DashboardLayout({ children, ...rest }: Readonly<DashboardLayoutProps>) {
  const me = (await getAccountMe())?.data;

  return (
    <Dashboard {...rest} me={me}>
      {children}
    </Dashboard>
  );
}
