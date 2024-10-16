import React from "react";

import type { Metadata } from "next";

import TournamentsTable from "@/components/tournaments-table";
import { getTournaments } from "@/app/server-actions/tournaments/actions";

export const metadata: Metadata = {
  title: "Tournaments",
};

const columns: { key: string; label: string }[] = [
  {
    key: "start_at",
    label: "DATE",
  },
  {
    key: "organization.name",
    label: "ORGANIZATION",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "game",
    label: "GAME",
  },
  {
    key: "format",
    label: "FORMAT",
  },
  {
    key: "players",
    label: "PLAYERS",
  },
  {
    key: "registration",
    label: "REGISTRATION",
  },
];

export default async function Tournaments() {
  const tours = (await getTournaments()).data?.data ?? [];

  const rightNow = new Date();
  const pastTours = tours.filter((tour) => tour.start_at && new Date(tour.start_at) < rightNow);
  const upcomingTours = tours.filter((tour) => tour.start_at && new Date(tour.start_at) >= rightNow);

  return (
    <div className="pb-4">
      {/* <Card className={`${cardClassNames}`} shadow="md">
        <CardHeader>Upcoming Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the upcoming tournaments.</p>
          <TournamentsTable columns={columns} data={upcomingTours} />
        </CardBody>
      </Card> */}

      {/* <Card className={`mt-4 ${cardClassNames}`} shadow="md">
        <CardHeader>Past Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the past tournaments.</p>

        </CardBody>
      </Card> */}

      <TournamentsTable columns={columns} data={[...pastTours, ...upcomingTours]} />
    </div>
  );
}
