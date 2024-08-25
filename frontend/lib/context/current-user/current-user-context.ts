"use client";

import React from "react";
import { DefinedUseQueryResult } from "@tanstack/react-query";

import { UserMe } from "@/lib/api";

export interface CurrentUserContextValue {
  currentUser: UserMe | null;
  query: DefinedUseQueryResult<UserMe | null, Error>;
}

export const CurrentUserContext = React.createContext<CurrentUserContextValue | null>(null);
