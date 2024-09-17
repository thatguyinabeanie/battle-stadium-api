import type { Metadata } from "next";

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { BattleStadiumAPI } from "@/lib/battle-stadium-api";

import TournamentsTable from "../../components/tournaments-table";

export const metadata: Metadata = {
  title: "Tournaments",
};

async function listTournaments() {
  return await BattleStadiumAPI(auth()).Tournaments.list();
}

const Tournaments = async () => {
  const response = await listTournaments();
  const tours = response.data?.data;

  return (
    <div className="overflow-y-scroll pb-4">
      <Card isBlurred className="my-2" shadow="none">
        <CardHeader>Upcoming Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the upcoming tournaments.</p>
          <TournamentsTable tournaments={tours} />
        </CardBody>
      </Card>

      <Card isBlurred shadow="none">
        <CardHeader>Past Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the past tournaments.</p>
          <TournamentsTable tournaments={tours} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Tournaments;
