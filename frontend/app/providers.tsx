"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ChildrenProps } from "@/types";

export interface ProvidersProps extends ChildrenProps {
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: Readonly<ProvidersProps>) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={process.env.REACT_QUERY_DEV_TOOLS == "true" ?? false}
      />
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
