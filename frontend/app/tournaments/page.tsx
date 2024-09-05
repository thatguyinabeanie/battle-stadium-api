import type { Metadata } from "next";

import React from "react";

import TournamentsTable from "./TournamentsTable";

import BattleStadiumAPI from "@/lib/api";

export const metadata: Metadata = {
  title: "Tournaments",
};

const Tournaments = async () => {
  const tournaments = await BattleStadiumAPI().Tournaments.list();

  return <TournamentsTable tournaments={tournaments} />;
};

export default Tournaments;
