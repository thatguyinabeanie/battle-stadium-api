import type { Metadata } from "next";

import React from "react";

import BattleStadiumAPI from "@/lib/api/battle-stadium-api";

import TournamentsTable from "./TournamentsTable";

export const metadata: Metadata = {
  title: "Tournaments",
};

const Tournaments = async () => {
  const tournaments = await BattleStadiumAPI().Tournaments.list();

  return <TournamentsTable tournaments={tournaments} />;
};

export default Tournaments;
