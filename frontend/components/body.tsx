import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { env } from "process";
import AwesomeParticles from "./awesome-particles";
import NavigationBar from "./navbar/navbar";
import Providers from "./providers";
import { ChildrenProps } from "@/types";
import Cookies from "./cookies";

export default function Body({ children }: Readonly<ChildrenProps>) {
  return (
    <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-y-scroll")}>
      <Providers>
        <AwesomeParticles />
        <div className="flex flex-col w-full h-full items-center">
          <main className="flex flex-col h-full w-3/4 z-0 justify-center items-center backdrop-blur-lg shadow-md gap-4 pt-4">
            <NavigationBar />
            <section className="flex flex-col gap-4 h-full items-center w-3/4">
              <HydrationOverlay>{children}</HydrationOverlay>
            </section>
          </main>
        </div>
      </Providers>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
      <Cookies />
    </body>
  );
}
