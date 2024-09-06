"use client";

import React from "react";

import { UserMe } from "@/lib/api";
import { ChildrenProps } from "@/types";

import { CurrentUserContext, CurrentUserContextValue } from "./current-user-context";

export interface CurrentUserContextProviderProps extends ChildrenProps {
  initCurrentUser: UserMe | null;
}

export default function CurrentUserContextProvider(props: CurrentUserContextProviderProps) {
  const { initCurrentUser, children } = props;

  const value: CurrentUserContextValue = {
    currentUser: initCurrentUser,
  };

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
