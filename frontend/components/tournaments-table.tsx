"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@nextui-org/react";
import * as React from "react";

import { components } from "@/lib/battle-stadium-api";

export interface TournamentsTableProps {
  columns: { key: string; label: string }[];
  tournaments: components["schemas"]["Tournament"][] | undefined;
}

function renderRegistration({
  registration_start_at,
  registration_end_at,
  player_count,
  player_cap,
  late_registration,
}: components["schemas"]["Tournament"]) {
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
  const date = startAt?.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const time = startAt?.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

  return `${date} ${time}`;
};

const renderCell = async (row: components["schemas"]["Tournament"], columnKey: React.Key) => {
  const { id, name, organization, start_at, player_count, player_cap } = row;

  switch (columnKey) {
    case "organization.name":
      return <Link href={`/organizations/${organization.slug}`}>{organization.name}</Link>;
    case "start_at":
      return renderStartDateString(start_at);
    case "name":
      return <Link href={`/tournaments/${id}`}>{name}</Link>;
    case "players":
      return player_cap ? `${player_count}/${player_cap}` : player_count;
    case "registration":
      return renderRegistration(row);
    default:
      return null;
  }
};

const TournamentsTable = ({ tournaments, columns }: TournamentsTableProps) => {
  return (
    <Table isStriped aria-label="list of tournaments" shadow="none">
      <TableHeader columns={columns}>
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
