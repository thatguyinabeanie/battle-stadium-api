import React from "react"

import TournamentsTable from "./TournamentsTable"

import { title } from "@/components/primitives"
import BattleStadiumAPI from "@/lib/battle-stadium-api"

const columns = [
  {
    key: "start_at",
    label: "DATE",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "organization.name",
    label: "Organization",
  },
]

const Tournaments = async () => {
  const tournaments = await BattleStadiumAPI.Tournaments.list()

  return (
    <div>
      <h1 className={title()}>Tournaments</h1>

      <TournamentsTable columns={columns} tournaments={tournaments} />
    </div>
  )
}

export default Tournaments
