import type { Metadata } from "next";

import React from "react";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

import TournamentsTable from "./TournamentsTable";

export const metadata: Metadata = {
  title: "Tournaments",
};

async function listTournaments() {
  return await BattleStadiumAPI.GET("/tournaments");
}

const Tournaments = async () => {
  const response = await listTournaments();
  const tours = response.data?.tournaments;

  return <TournamentsTable tournaments={tours} />;
};

export default Tournaments;
