"use client";

import { ReactNode } from "react";
import { NextUIProvider as NextUIDefaultProvider, NextUIProviderProps } from "~/components/nextui/client-components";
import { useRouter } from "next/navigation";

export interface ProvidersProps extends NextUIProviderProps {
  children: ReactNode;
}

export default function NextUIProvider({ children, ...rest }: Readonly<ProvidersProps>) {
  const router = useRouter();

  return (
    <NextUIDefaultProvider {...rest} navigate={router.push}>
      {children}
    </NextUIDefaultProvider>
  );
}
