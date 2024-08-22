import MainPageLayout from "@/components/main-page-layout";
import { ChildrenProps } from "@/types";

export default function Layout({ children }: Readonly<ChildrenProps>) {
  return <MainPageLayout title="Organizations" disableHeader>{children}</MainPageLayout>;
}
