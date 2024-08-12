// app/providers-client.tsx
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ChildrenProps } from "@/types";

export interface ReactQueryClientProviderProps extends ChildrenProps {
  initialIsOpen?: boolean;
}

const queryClient = new QueryClient();

export default function ReactQueryClientProvider({
  children,
  initialIsOpen,
}: ReactQueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={initialIsOpen} />
      {children}
    </QueryClientProvider>
  );
}
