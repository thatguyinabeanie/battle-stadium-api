import "@/styles/globals.css";

import { NextUIProvider, ThemesProvider } from "@/components/providers";
import { ChildrenProps } from "@/types";
import { CurrentUserContextProvider } from "@/lib/context/current-user";

export default async function Providers({ children }: Readonly<ChildrenProps>) {
  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <div className="flex h-dvh w-full">
          <CurrentUserContextProvider initCurrentUser={null}>{children}</CurrentUserContextProvider>
        </div>
      </ThemesProvider>
    </NextUIProvider>
  );
}
