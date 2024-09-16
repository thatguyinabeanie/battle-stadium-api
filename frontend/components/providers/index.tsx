import "@/styles/globals.css";

import { ChildrenProps } from "@/types";

import NextUIProvider from "./next-ui-provider";
import ThemesProvider from "./themes-provider";

export default async function Providers({ children }: Readonly<ChildrenProps>) {
  return (
    <NextUIProvider>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <div className="flex h-dvh w-full"> {children} </div>
      </ThemesProvider>
    </NextUIProvider>
  );
}
