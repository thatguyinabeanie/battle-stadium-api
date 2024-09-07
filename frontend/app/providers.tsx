import "@/styles/globals.css";

import { NextUIProvider, ThemesProvider } from "@/components/providers";
import { ChildrenProps } from "@/types";

export default async function Providers({ children }: Readonly<ChildrenProps>) {
  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <div className="flex h-dvh w-full">{children}</div>
      </ThemesProvider>
    </NextUIProvider>
  );
}
