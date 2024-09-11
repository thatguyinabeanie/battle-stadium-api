import MainPageLayout from "@/components/main-page-layout";
import { ChildrenProps } from "@/types";

export default function DashboardLayout({ children }: Readonly<ChildrenProps>) {
  return <MainPageLayout>{children}</MainPageLayout>;
}
