import type { Metadata } from "next";

import React from "react";
import { auth } from "@clerk/nextjs/server";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

import TournamentsTable from "./TournamentsTable";

export const metadata: Metadata = {
  title: "Tournaments",
};

async function listTournaments() {
  return await BattleStadiumAPI(auth()).Tournaments.list({
    next: {
      tags: ["tournaments"],
      // revalidate: 60*60*2,
    },
    params: {
      query: {
        per_page: 10,
        page: 0,
      },
    },
  });
}

const Tournaments = async () => {
  const response = await listTournaments();
  const tours = response.data?.tournaments;

  return <TournamentsTable tournaments={tours} />;
};

export default Tournaments;
