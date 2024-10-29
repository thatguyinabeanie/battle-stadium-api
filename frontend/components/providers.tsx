"use client";

import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ChildrenProps } from "~/types";
import { NextUIProvider } from "~/components/nextui/client-components";

export default function Providers({ children }: Readonly<ChildrenProps>) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
