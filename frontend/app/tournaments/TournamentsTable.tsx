"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link } from "@nextui-org/react";
import * as React from "react";

import { Tournament } from "@/lib/api";

export interface TournamentsTableProps {
  tournaments: Tournament[];
  disableColumns?: string[];
}

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

function renderRegistration({
  registrationStartAt,
  registrationEndAt,
  playerCount,
  playerCap,
  lateRegistration,
}: Tournament) {
  const currentTime = new Date();

  if (!registrationStartAt) {
    return "Not Open";
  }

  if (currentTime < registrationStartAt) {
    return "Not Open";
  }

  if (currentTime >= registrationStartAt && registrationEndAt && currentTime < registrationEndAt) {
    if (playerCap && playerCount >= playerCap) {
      return "Full";
    }

    return "Open";
  }

  if (registrationEndAt && currentTime > registrationEndAt) {
    if (lateRegistration) {
      return "Open";
    }

    return "Closed";
  }
}

const renderCell: typeof getKeyValue = (row: Tournament, columnKey) => {
  const { id, name, organization, startAt, playerCount, playerCap } = row;

  switch (columnKey) {
    case "organization.name":
      return <Link href={`/organizations/${organization.id}`}>{organization.name}</Link>;
    case "start_at":
      const date = startAt?.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const time = startAt?.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

      return `${date} ${time}`;
    case "name":
      return <Link href={`/tournaments/${id}`}>{name}</Link>;
    case "players":
      return playerCap ? `${playerCount}/${playerCap}` : playerCount;
    case "registration":
      return renderRegistration(row);
    default:
      return null;
  }
};

const TournamentsTable = ({ tournaments, disableColumns }: TournamentsTableProps) => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <Table isStriped aria-label="list of tournaments">
      <TableHeader columns={columns.filter((c) => !disableColumns?.includes(c.key))}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={tournaments}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TournamentsTable;
