import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { AppProps } from "next/app";

import Providers from "./providers";
import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import SidebarResponsive from "@/components/sidebar/sidebar-responsive";
// import { auth } from "@/auth";

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

async function RootLayout({ children }: ChildrenProps & AppProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-hidden")}>
        <Providers>
          <main className="flex h-full w-full">
            <SidebarResponsive aria-label="Responsive Sidebar" />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
