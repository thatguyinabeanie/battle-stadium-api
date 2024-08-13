import { ChildrenProps } from "@/types";
import Header from "@/components/header";

export interface MainPageLayoutProps extends ChildrenProps {
  title: string;
}

export default function MainPageLayout({
  children,
  title,
}: Readonly<MainPageLayoutProps>) {
  return (
    <div className="w-full flex-1 flex-col p-4">
      <Header title={title} />

      <main className="h-full flex flex-col gap-4 rounded-medium border-divider overflow-auto">
        <section className="flex flex-col gap-4 py-8 md:py-10 h-full w-ful items-center">
          {children}
        </section>
      </main>

      {/* <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </footer> */}
    </div>
  );
}
