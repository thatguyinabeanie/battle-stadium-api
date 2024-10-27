"use client";

import * as React from "react";
import { NextUIProvider as NextUIDefaultProvider, NextUIProviderProps } from "@/components/nextui/client-components";
import { useRouter } from "next/navigation";

export interface ProvidersProps extends NextUIProviderProps {
  children: React.ReactNode;
}

export default function NextUIProvider({ children, ...rest }: Readonly<ProvidersProps>) {
  const router = useRouter();

  return (
    <NextUIDefaultProvider {...rest} navigate={router.push}>
      {children}
    </NextUIDefaultProvider>
  );
}
