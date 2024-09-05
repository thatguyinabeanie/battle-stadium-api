import type { Metadata } from "next";

import React from "react";

import TournamentsTable from "./TournamentsTable";

import BattleStadiumAPI, { Tournament } from "@/lib/api/battle-stadium-api";

export const metadata: Metadata = {
  title: "Tournaments",
};

const Tournaments = async () => {
  const tournaments: Tournament[] = await BattleStadiumAPI().Tournaments.list();
  // const tournaments: Tournament[] = [];

  return <TournamentsTable tournaments={tournaments} />;
};

export default Tournaments;
