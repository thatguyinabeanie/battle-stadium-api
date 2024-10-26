import "@/styles/globals.css";

import React from "react";
import { Metadata, Viewport } from "next";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { auth } from "@clerk/nextjs/server";
import { ClerkProvider } from "@clerk/nextjs";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";

import Providers from "@/components/providers";
import Footer from "@/components/footer";
import Body from "@/components/body";

const Cookies = dynamic(() => import("@/components/cookies"));
const AwesomeParticles = dynamic(() => import("@/components/awesome-particles"));

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

export default async function RootLayout({ children }: ChildrenProps & AppProps) {
  const { userId, sessionId } = await auth();

  return (
    <React.StrictMode>
      <ClerkProvider>
        <html suppressHydrationWarning lang="en">
          <head />

          <body className="bg-background font-sans antialiased overflow-y-scroll">
            <Providers>
              <AwesomeParticles />

              <Body>{children}</Body>
            </Providers>

            <Footer />
          </body>

          <Cookies isSignedIn={!!sessionId} userId={userId} />

          <Analytics />
          {env.VERCEL_ENV === "production" && <SpeedInsights />}
          <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
        </html>
      </ClerkProvider>
    </React.StrictMode>
  );
}
