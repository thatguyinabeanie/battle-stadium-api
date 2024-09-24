"use client";

import { Table, TableHeader, TableColumn, TableBody, TableCell, TableRow, Link } from "@nextui-org/react";
import * as React from "react";

import { Tournament } from "@/lib/api";

interface TableProps {
  columns: { key: string; label: string }[];
  data: Tournament[] | undefined;
}
export default function TournamentsTable({ columns, data }: TableProps) {
  return (
    <Table isHeaderSticky isStriped isVirtualized aria-label="list of tournaments" shadow="md">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={data}>
        {(row) => (
          <TableRow key={JSON.stringify(row)}>
            {(columnKey) => <TableCell>{renderCell( row, columnKey )}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

function renderRegistration ({
  registration_start_at,
  registration_end_at,
  player_count,
  player_cap,
  late_registration,
}: Tournament) {
  const currentTime = new Date();

  if (!registration_start_at) {
    return "Not Open";
  }

  const registrationStartAt = new Date(registration_start_at);

  if (currentTime < registrationStartAt) {
    return "Not Open";
  }

  const registrationEndAt = registration_end_at ? new Date(registration_end_at) : null;

  if (currentTime >= registrationStartAt && registrationEndAt && currentTime < registrationEndAt) {
    if (player_cap && player_count >= player_cap) {
      return "Full";
    }

    return "Open";
  }

  if (registrationEndAt && currentTime > registrationEndAt) {
    if (late_registration) {
      return "Open";
    }

    return "Closed";
  }
}

const renderStartDateString = (start_at: string | null) => {
  if (!start_at) {
    return "TBD";
  }

  const startAt = new Date(start_at);
  const date = startAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });

  return date;
};

function renderCell (row: Tournament, columnKey: React.Key )  {
  const { id, name, organization, start_at, player_count, player_cap } = row;

  switch (columnKey) {
    case "organization.name":
      return <Link href={ `/organizations/${organization.slug}` }> { organization.name } </Link>;
    case "start_at":
      return renderStartDateString(start_at);
    case "name":
      return <Link href={ `/organizations/${organization.slug}/tournaments/${id}` }> { name } </Link>;
    case "players":
      return player_cap ? `${player_count}/${player_cap}` : player_count;
    case "registration":
      return renderRegistration(row);
    default:
      return null;
  }
};
