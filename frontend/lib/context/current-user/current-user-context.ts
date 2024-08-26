"use client";

import React from "react";

import { UserMe } from "@/lib/api";

export interface CurrentUserContextValue {
  currentUser: UserMe | null;
}

export const CurrentUserContext = React.createContext<CurrentUserContextValue | null>(null);
