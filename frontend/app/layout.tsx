import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import NavigationBar from "@/components/navbar/navbar";
import Providers from "@/components/providers";
import AwesomeParticles from "@/components/awesome-particles";
import Cookies from "@/components/cookies";
import React from "react";

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
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: ChildrenProps & AppProps) {
  return (
    <React.StrictMode>
      <ClerkProvider>
        <html suppressHydrationWarning lang="en">
          <head />
          <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-y-scroll")}>
            <Providers>
              <AwesomeParticles />
              <div className="flex flex-col w-full h-full">
                <NavigationBar />
                <main className="flex h-full w-full z-0">
                  <div className="w-full flex-1 flex-col px-4">
                    <div className="h-full flex flex-col gap-4 rounded-medium border-divider ">
                      <section className="flex flex-col gap-4 py-4 h-full w-ful items-center">{children}</section>
                    </div>
                  </div>
                </main>
              </div>
            </Providers>
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
            <Cookies />
          </body>
        </html>
      </ClerkProvider>
    </React.StrictMode>
  );
}
