"use client";
import "@/styles/globals.css";

import { useRouter } from "next/navigation";

import NextUIProvider from "./next-ui-provider";
import ThemesProvider from "./themes-provider";

import { ChildrenProps } from "@/types";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Providers({ children }: Readonly<ChildrenProps>) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemesProvider attribute="class" defaultTheme="dark">
        <div className="flex h-dvh w-full"> {children} </div>
      </ThemesProvider>
    </NextUIProvider>
  );
}
