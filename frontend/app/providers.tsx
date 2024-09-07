import "@/styles/globals.css";

import { NextUIProvider, ReactQueryClientProvider, ThemesProvider } from "@/components/providers";
import { ChildrenProps } from "@/types";
import { CurrentUserContextProvider } from "@/lib/context/current-user";

const initialIsOpen = process.env.NODE_ENV === "development";

export default async function Providers({ children }: Readonly<ChildrenProps>) {
  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <ReactQueryClientProvider initialIsOpen={initialIsOpen}>
          <div className="flex h-dvh w-full">
            <CurrentUserContextProvider initCurrentUser={null}>{children}</CurrentUserContextProvider>
          </div>
        </ReactQueryClientProvider>
      </ThemesProvider>
    </NextUIProvider>
  );
}
