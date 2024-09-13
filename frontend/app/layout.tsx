import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";

import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import getAwesomeParticlesOptions from "@/components/awesome-particles/getAwesomeParticlesOptions";
import SidebarResponsive from "@/components/sidebar/sidebar-responsive";

import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }: ChildrenProps & AppProps) {
  const AwesomeParticles = dynamic(() => import("@/components/awesome-particles/awesome-particles"));

  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-hidden z-10")}>
          <main className="flex h-full w-full z-10">
            <Providers>
              <AwesomeParticles options={await getAwesomeParticlesOptions()} />
              <SidebarResponsive aria-label="Responsive Sidebar" />
              <div className="w-full flex-1 flex-col p-4 z-10">
                <div className="h-full flex flex-col gap-4 rounded-medium border-divider overflow-auto">
                  <section className="flex flex-col gap-4 py-8 md:py-10 h-full w-ful items-center">{children}</section>
                </div>
              </div>
            </Providers>
          </main>
        </body>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.MEASUREMENT_ID ?? ""} />
      </html>
    </ClerkProvider>
  );
}
