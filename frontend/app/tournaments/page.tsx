import React from "react";

import TournamentsTable from "./TournamentsTable";

import { title } from "@/components/primitives";
import BattleStadiumAPI from "@/lib/battle-stadium-api";

const Tournaments = async () => {
  const tournaments = await BattleStadiumAPI.Tournaments.list();

  return (
    <>
      <TournamentsTable tournaments={tournaments} />
    </>
  );
};

export default Tournaments;
