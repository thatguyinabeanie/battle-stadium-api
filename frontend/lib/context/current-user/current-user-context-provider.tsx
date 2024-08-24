"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

import { CurrentUserContext, CurrentUserContextValue } from "./current-user-context";

import { UserMe } from "@/lib/api";
import { ChildrenProps } from "@/types";
import BattleStadiumAPI from "@/lib/battle-stadium-api";

export interface CurrentUserContextProviderProps extends ChildrenProps {
  initCurrentUser: UserMe | null;
}

export default function CurrentUserContextProvider(props: CurrentUserContextProviderProps) {
  const { initCurrentUser, children } = props;

  const { data: session } = useSession();

  // console.log("CurrentUserContextProvider", session); // eslint-disable-line no-console

  const queryResult = useQuery({
    queryKey: ["currentUser"],
    queryFn: session ? BattleStadiumAPI.Users.me : () => Promise.resolve(initCurrentUser),
    initialData: initCurrentUser,
  });

  const value: CurrentUserContextValue = {
    currentUser: queryResult.data,
    query: queryResult,
  };

  // console.log('current user context value', value);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
