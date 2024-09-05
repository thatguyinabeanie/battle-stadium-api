import Head from "next/head";

import SidebarResponsive from "@/components/sidebar/sidebar-responsive";
import { ChildrenProps } from "@/types";

export interface MainPageLayoutProps extends ChildrenProps {
  title: string;
}
export default function MainPageLayout({ children, title }: Readonly<MainPageLayoutProps>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SidebarResponsive aria-label="Responsive Sidebar" />
      <div className="w-full flex-1 flex-col p-4">
        <div className="h-full flex flex-col gap-4 rounded-medium border-divider overflow-auto">
          <section className="flex flex-col gap-4 py-8 md:py-10 h-full w-ful items-center">{children}</section>
        </div>
      </div>
    </>
  );
}
