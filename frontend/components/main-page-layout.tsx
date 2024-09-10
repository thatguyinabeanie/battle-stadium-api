import SidebarResponsive from "@/components/sidebar/sidebar-responsive";
import { ChildrenProps } from "@/types";

export default function MainPageLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <>
      <SidebarResponsive aria-label="Responsive Sidebar" />
      <div className="w-full flex-1 flex-col p-4 z-10">
        <div className="h-full flex flex-col gap-4 rounded-medium border-divider overflow-auto">
          <section className="flex flex-col gap-4 py-8 md:py-10 h-full w-ful items-center">{children}</section>
        </div>
      </div>
    </>
  );
}
