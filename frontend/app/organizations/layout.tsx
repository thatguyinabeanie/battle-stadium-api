import MainPageLayout from "@/components/main-page-layout";
import { ChildrenProps } from "@/types";

export default function Layout({ children }: ChildrenProps) {
  return <MainPageLayout title="Organizations">{children}</MainPageLayout>;
}
