import "~/styles/globals.css";

import { StrictMode } from "react";
import { Metadata, Viewport } from "next";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { auth } from "@clerk/nextjs/server";
import { ClerkProvider } from "@clerk/nextjs";

import { env } from "~/env.mjs";
import { siteConfig } from "~/config/site";
import { ChildrenProps } from "~/types";

import Providers from "~/components/providers";
import Footer from "~/components/footer";
import NavigationBar from "~/components/navbar/navbar";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { UploadThingRouter } from "./api/uploadthing/core";

const Cookies = dynamic(() => import("~/components/cookies"));
const AwesomeParticles = dynamic(() => import("~/components/awesome-particles"));

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
    <StrictMode>
      <ClerkProvider>
        <html suppressHydrationWarning lang="en">
          <head />

          <body className="bg-background font-sans antialiased overflow-y-scroll">
            <Providers>
              <NextSSRPlugin routerConfig={extractRouterConfig(UploadThingRouter)} />

              <div className="flex flex-col items-center min-h-screen ">
                <AwesomeParticles />

                <NavigationBar />

                <div className="flex flex-col items-center min-h-screen backdrop-blur shadow-2xl dark:shadow-white w-5/6 ">
                  <main className="flex flex-col min-h-screen items-center w-full">
                    <section className="flex flex-col gap-4 w-full items-center z-0">{children}</section>
                  </main>

                  <Footer />
                </div>
              </div>

              <Cookies isSignedIn={!!sessionId} userId={userId} />

              <VercelAnalytics />

              {env.VERCEL_ENV === "production" && <VercelSpeedInsights />}

              <GoogleAnalytics gaId={env.MEASUREMENT_ID ?? ""} />
            </Providers>
          </body>
        </html>
      </ClerkProvider>
    </StrictMode>
  );
}
