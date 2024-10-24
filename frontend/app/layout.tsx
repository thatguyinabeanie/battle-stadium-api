import React from "react";

import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata, Viewport } from "next";
import { AppProps } from "next/app";

import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import Footer from "@/components/footer";
import Body from "@/components/body";

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
          <Body>{children}</Body>
          <Footer />
        </html>
      </ClerkProvider>
    </React.StrictMode>
  );
}
