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

      <div className="flex h-[99%] w-full flex-col gap-4 rounded-medium border-divider overflow-auto">
        <main className="mt-4 h-full w-full overflow-auto">
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
              {children}
            </div>
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
    </div>
  );
}
