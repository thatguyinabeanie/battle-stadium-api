import "@/styles/globals.css";

import { SessionProvider } from "@/components/client";
import { NextUIProvider, ReactQueryClientProvider, ThemesProvider } from "@/components/providers";
import { ChildrenProps } from "@/types";
// import BattleStadiumAPI from "@/lib/api";
import { CurrentUserContextProvider } from "@/lib/context/current-user";
// import { auth } from "@/lib/auth";

const initialIsOpen = process.env.NODE_ENV === "development";

export default async function Providers({ children }: ChildrenProps) {
  // const currentUser = await getCurrentUser();

  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <ReactQueryClientProvider initialIsOpen={initialIsOpen}>
            <div className="flex h-dvh w-full">
              <CurrentUserContextProvider initCurrentUser={null}>{children}</CurrentUserContextProvider>
            </div>
          </ReactQueryClientProvider>
        </SessionProvider>
      </ThemesProvider>
    </NextUIProvider>
  );
}
