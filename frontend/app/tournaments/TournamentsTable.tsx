"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Link
} from "@nextui-org/react";
import * as React from "react";

import { Tournament } from "@/api";

export interface TournamentsTableProps {
  tournaments: Tournament[];
  columns: { key: string; label: string }[];
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

function renderRegistration(row: Tournament) {
  const currentTime = new Date().toLocaleTimeString();
  const registrationStart = new Date(
    row.registration_start_at,
  ).toLocaleTimeString();

  const registrationEnd = new Date(
    row.registration_end_at,
  ).toLocaleTimeString();

  if (currentTime < registrationStart) {
    return "Not Open";
  }

  if (currentTime >= registrationStart && currentTime < registrationEnd) {
    if (row.player_cap && row.player_count >= row.player_cap) {
      return "Full";
    }

    return "Open";
  }

  if (currentTime > registrationEnd) {
    if (row.late_registration) {
      return "Open";
    }

    return "Closed";
  }
}

const renderCell: typeof getKeyValue = (row: Tournament, columnKey) => {
  switch (columnKey) {
    case "organization.name":
      return (
        <Link href={`/organizations/${row.organization.id}`}>
          {row.organization.name}
        </Link>
      );
    case "start_at":
      return row.start_at as string;
    case "name":
      return <Link href={`/tournaments/${row.id}`}>{row.name}</Link>;
    case "players":
      return row.player_cap
        ? `${row.player_count}/${row.player_cap}`
        : row.player_count;
    case "registration":
      return renderRegistration(row);
    default:
      return getKeyValue(row, columnKey);
  }
};

const TournamentsTable = ({ tournaments }: TournamentsTableProps) => {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <Table isStriped aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={tournaments}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TournamentsTable;
