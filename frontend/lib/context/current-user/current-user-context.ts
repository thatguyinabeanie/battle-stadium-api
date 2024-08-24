"use client";

import React from "react";

import { UserMe } from "@/lib/api";
import { DefinedUseQueryResult } from "@tanstack/react-query";

export interface CurrentUserContextValue {
  currentUser: UserMe | null;
  query: DefinedUseQueryResult<UserMe | null, Error>
}

export const CurrentUserContext = React.createContext<CurrentUserContextValue | null>(null);
