import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import SidebarResponsive from "@/components/sidebar/sidebar-responsive";
import { NextUIProvider, ReactQueryClientProvider, ThemesProvider } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { ChildrenProps } from "@/types";
import BattleStadiumAPI from "@/lib/battle-stadium-api";
import { CurrentUserContextProvider } from "@/lib/context/current-user";
import { auth } from "@/auth";

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

const getCurrentUser = async () => {
  const session = await auth();

  console.log('session', session);
  if (!session) {
    return null;
  }

  try {
    const me = await BattleStadiumAPI.Users.me();
    console.log('me', me);
    return me;
  } catch (error) {
    console.error('error', error);
    return null;
  }
};

async function RootLayout({ children }: ChildrenProps & AppProps) {
  const currentUser = await getCurrentUser();

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased overflow-hidden")}>
        <ThemesProvider>
          <NextUIProvider>
            <SessionProvider>
              <ReactQueryClientProvider initialIsOpen={initialIsOpen}>
                <div className="flex h-dvh w-full">
                  <CurrentUserContextProvider initCurrentUser={currentUser}>
                    <SidebarResponsive aria-label="Responsive Sidebar" />
                    {children}
                  </CurrentUserContextProvider>
                </div>
              </ReactQueryClientProvider>
            </SessionProvider>
          </NextUIProvider>
        </ThemesProvider>
      </body>
    </html>
  );
}

export default RootLayout;
