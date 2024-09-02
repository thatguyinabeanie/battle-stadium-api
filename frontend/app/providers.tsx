import "@/styles/globals.css";

import { SessionProvider } from "@/components/client";
import { NextUIProvider, ReactQueryClientProvider, ThemesProvider } from "@/components/providers";
import { ChildrenProps } from "@/types";
import BattleStadiumAPI from "@/lib/battle-stadium-api";
import { CurrentUserContextProvider } from "@/lib/context/current-user";
import { auth } from "@/auth";

const getCurrentUser = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return BattleStadiumAPI().Users.me();
};
const initialIsOpen = process.env.NODE_ENV === "development";

export default async function Providers({ children }: ChildrenProps) {
  const currentUser = await getCurrentUser();

  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>
          <ReactQueryClientProvider initialIsOpen={initialIsOpen}>
            <div className="flex h-dvh w-full">
              <CurrentUserContextProvider initCurrentUser={currentUser}>{children}</CurrentUserContextProvider>
            </div>
          </ReactQueryClientProvider>
        </SessionProvider>
      </ThemesProvider>
    </NextUIProvider>
  );
}
