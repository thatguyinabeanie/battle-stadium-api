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

// export async function customFetch (input: RequestInfo, init?: RequestInit): Promise<Response> {
//   console.log('Fetch request:', {
//     url: input,
//     method: init?.method || 'GET',
//     headers: init?.headers,
//     body: init?.body,
//   });

//   const response = await fetch(input, init);

//   const clonedResponse = response.clone();
//   const responseBody = await clonedResponse.text();

//   console.log('Fetch response:', {
//     status: response.status,
//     headers: response.headers,
//     body: responseBody,
//   });

//   return response;
// }

// if (typeof window !== 'undefined') {
//   // @ts-ignore
//   window.fetch = customFetch;
// } else {
//   // @ts-ignore
//   global.fetch = customFetch;
// }

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

  if (!session) {
    return null;
  }

  try {
    const me = await BattleStadiumAPI.Users.me();

    // console.log("me", me); // eslint-disable-line no-console

    return me;
  } catch (error) {
    // TODO: log error to external service like sumologic, splunk, etc.
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
