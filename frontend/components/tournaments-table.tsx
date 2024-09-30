"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Link,
  Image,
} from "@/components/nextui-use-client";
import * as React from "react";

import { Tournament } from "@/lib/api";

interface TableProps {
  columns: { key: string; label: string }[];
  data: Tournament[] | undefined;
}

export default function TournamentsTable({ columns, data }: Readonly<TableProps>) {
  return (
    <Table
      isHeaderSticky
      isVirtualized
      aria-label="list of tournaments"
      classNames={{
        wrapper: "bg-transparent backdrop-blur-md",
      }}
      selectionMode="single"
      shadow="md"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={data}>
        {(tournament) => (
          <TableRow
            key={tournament.id}
            as={Link}
            href={`/organizations/${tournament.organization.slug}/tournaments/${tournament.id}`}
            style={{ cursor: "pointer" }}
          >
            {(columnKey) => <TableCell>{renderCell(tournament, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function renderRegistration({
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

function renderCell(tournament: Tournament, key: React.Key) {
  const { id, name, organization, start_at, player_count, player_cap, game, format } = tournament;

  switch (key) {
    case "organization.name":
      return (
        <Link className="flex justify-center items-center" href={`/organizations/${organization.slug}`}>
          <Image
            alt="Organization Logo"
            className="rounded-small"
            height={40}
            src={organization.logo_url ?? "/pokemon/vgc.png"}
            width={40}
          />
        </Link>
      );
    case "start_at":
      return renderStartDateString(start_at);
    case "name":
      return <Link href={`/organizations/${organization.slug}/tournaments/${id}`}> {name} </Link>;
    case "players":
      return player_cap ? `${player_count}/${player_cap}` : player_count;
    case "registration":
      return renderRegistration(tournament);
    case "game":
      return game.name;
    case "format":
      return format.name;
    default:
      return null;
  }
}
