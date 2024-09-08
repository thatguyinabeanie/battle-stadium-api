import MainPageLayout from "@/components/main-page-layout";
import { ChildrenProps } from "@/types";
export default function AnalyticsLayout({ children }: Readonly<ChildrenProps>) {
  return <MainPageLayout>{children}</MainPageLayout>;
}
