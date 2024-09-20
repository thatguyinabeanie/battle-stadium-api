import type { Metadata } from "next";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import TournamentsTable from "@/components/tournaments-table";
import { getTournaments } from "../data/actions";

export const metadata: Metadata = {
  title: "Tournaments",
};

const columns: { key: string; label: string }[] = [
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
    label: "ORGANIZATION",
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

const Tournaments = async () => {
  const tours = await getTournaments();

  const rightNow = new Date();
  const pastTours = tours.filter((tour) => tour.start_at && new Date(tour.start_at) < rightNow);
  const upcomingTours = tours.filter((tour) => tour.start_at && new Date(tour.start_at) >= rightNow);

  return (
    <div className="pb-4">
      <Card className="my-2 bg-transparent" shadow="none">
        <CardHeader>Upcoming Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the upcoming tournaments.</p>
          <TournamentsTable columns={columns} data={upcomingTours} />
        </CardBody>
      </Card>

      <Card isBlurred shadow="none">
        <CardHeader>Past Tournaments</CardHeader>
        <CardBody>
          <p>Here you can find all the past tournaments.</p>
          <TournamentsTable columns={columns} data={pastTours} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Tournaments;
