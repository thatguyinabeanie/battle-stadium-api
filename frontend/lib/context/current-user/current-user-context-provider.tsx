"use client"

import { useQuery } from "@tanstack/react-query"

import { CurrentUserContext } from "./current-user-context"

import { UserMe } from "@/lib/api"
import { ChildrenProps } from "@/types"
import BattleStadiumAPI from "@/lib/battle-stadium-api"

export interface CurrentUserContextProviderProps extends ChildrenProps {
  initCurrentUser: UserMe | null
}

export default function CurrentUserContextProvider(props: CurrentUserContextProviderProps) {
  const { initCurrentUser, children } = props

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: BattleStadiumAPI.Users.me,
    initialData: initCurrentUser,
  })

  return <CurrentUserContext.Provider value={currentUser}>{children}</CurrentUserContext.Provider>
}
