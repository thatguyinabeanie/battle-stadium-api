import type { Metadata } from "next";

import React from "react";

import {BattleStadiumAPI} from "@/lib/battle-stadium-api";

import TournamentsTable from "./TournamentsTable";

export const metadata: Metadata = {
  title: "Tournaments",
};

async function listTournaments() {
  return await BattleStadiumAPI.GET("/tournaments");
}

const Tournaments = async () => {
  const {data: tournaments} = await listTournaments();

  return <TournamentsTable tournaments={tournaments} />;
};

export default Tournaments;
