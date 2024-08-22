"use client"

import React from "react"

import { UserMe } from "@/lib/api"

export const CurrentUserContext = React.createContext<UserMe | null>(null)
