"use client"

import React from "react"

import { CurrentUserContext } from "./current-user-context"

export const useCurrentUser = () => {
  const context = React.useContext(CurrentUserContext)

  if (context === undefined) {
    throw "Context is undefined. Must inherit from a CurrentUserContext Provider"
  }

  return context
}
