import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import SideBarComponent from "./SideBarComponent";

import { siteConfig } from "@/config/site";
import ChildrenProps from "@/types/childrenProps";
import clsx from "clsx";
import { AppProps } from 'next/app';

export interface RootLayoutProps extends ChildrenProps {
  route?: string;
}

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

function RootLayout ({ children , route}: RootLayoutProps & AppProps) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={ clsx("min-h-screen bg-background font-sans antialiased overflow-hidden") }
      >
        <Providers>
          <SideBarComponent route={route}>{children}</SideBarComponent>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
