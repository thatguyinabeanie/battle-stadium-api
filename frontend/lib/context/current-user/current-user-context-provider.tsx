"use client";

import { useQuery } from "@tanstack/react-query";

import { CurrentUserContext, CurrentUserContextValue } from "./current-user-context";

import { UserMe } from "@/lib/api";
import { ChildrenProps } from "@/types";
import BattleStadiumAPI from "@/lib/battle-stadium-api";
import { useSession } from "next-auth/react";

export interface CurrentUserContextProviderProps extends ChildrenProps {
  initCurrentUser: UserMe | null;
}

export default function CurrentUserContextProvider(props: CurrentUserContextProviderProps) {
  const { initCurrentUser, children } = props;


  const { data: session } = useSession();

  const queryResult = useQuery({
    queryKey: ["currentUser"],
    queryFn: session ? BattleStadiumAPI.Users.me : () => Promise.resolve(initCurrentUser),
    initialData: initCurrentUser,
  });

  const value: CurrentUserContextValue = {
    currentUser: queryResult.data,
    query: queryResult,
  };

  return <CurrentUserContext.Provider value={ value }>{children}</CurrentUserContext.Provider>;
}
