import React from "react";

import TournamentsTable from "./TournamentsTable";

import { title } from "@/components/primitives";
import { Tournament, TournamentsApi } from "@/lib/api";

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
];

const Tournaments = async () => {
  const tournamentsApi = new TournamentsApi();

  const tournaments: Tournament[] = (await tournamentsApi.listTournaments())
    .data;

  return (
    <div>
      <h1 className={title()}>Tournaments</h1>

      <TournamentsTable columns={columns} tournaments={tournaments} />
    </div>
  );
};

export default Tournaments;
