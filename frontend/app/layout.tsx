import React from "react";

import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata, Viewport } from "next";
import { AppProps } from "next/app";

import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import Footer from "@/components/footer";
import Body from "@/components/body";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "@/env.mjs";
import Cookies from "@/components/cookies";
import { auth } from "@clerk/nextjs/server";

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

          <Body>{children}</Body>

          <Cookies isSignedIn={!!sessionId} userId={userId} />

          <Footer />

          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
        </html>
      </ClerkProvider>
    </React.StrictMode>
  );
}
