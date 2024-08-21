"use client";

import * as React from "react";
import { NextUIProvider as NextUIDefaultProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { ChildrenProps } from "@/types";

export default function NextUIProvider({ children }: Readonly<ChildrenProps>) {
  const router = useRouter();

  return <NextUIDefaultProvider navigate={router.push}>{children}</NextUIDefaultProvider>;
}
