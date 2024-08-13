import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { AppProps } from "next/app";

import SidebarResponsive from "./sidebar-responsive";

import {
  NextUIProvider,
  ReactQueryClientProvider,
  ThemesProvider,
} from "@/components/providers";
import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";

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

const initialIsOpen = process.env.NODE_ENV === "development";

function RootLayout({ children }: ChildrenProps & AppProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased overflow-hidden",
        )}
      >
        <ThemesProvider>
          <NextUIProvider>
            <ReactQueryClientProvider initialIsOpen={initialIsOpen}>
              <div className="flex h-dvh w-full">
                <SidebarResponsive />
                {children}
              </div>
            </ReactQueryClientProvider>
          </NextUIProvider>
        </ThemesProvider>
      </body>
    </html>
  );
}

export default RootLayout;
