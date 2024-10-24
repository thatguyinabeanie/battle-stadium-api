import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import clsx from "clsx";
import AwesomeParticles from "./awesome-particles";
import NavigationBar from "./navbar/navbar";
import Providers from "./providers";
import { ChildrenProps } from "@/types";
import { Card } from "@/components/nextui-use-client";

export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-y-scroll")}>
      <Providers>
        <AwesomeParticles />
        <div className="flex flex-col w-full h-full">
          <NavigationBar />
          <main className="flex flex-col h-full w-full z-0 justify-center items-center py-4">
            <Card className="w-3/4 h-full flex flex-col bg-transparent justify-center items-center backdrop-blur p-4">
              <section className="flex flex-col gap-4 h-full w-full items-center">
                <HydrationOverlay>{children}</HydrationOverlay>
              </section>
            </Card>
          </main>
        </div>
      </Providers>
    </body>
  );
}