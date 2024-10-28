"use client";
import "~/styles/globals.css";

import { useRouter } from "next/navigation";

import { ChildrenProps } from "~/types";

import NextUIProvider from "~/components/providers/next-ui-provider";
import ThemesProvider from "~/components/providers/themes-provider";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Providers({ children }: Readonly<ChildrenProps>) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemesProvider>
    </NextUIProvider>
  );
}
