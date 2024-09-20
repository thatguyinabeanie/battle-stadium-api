import { Link } from "@nextui-org/react";

import { components } from "@/lib/api";
import { format, parseISO } from "date-fns";

type Tournament = components["schemas"]["Tournament"];

export interface TableProps {
  columns: { key: string; label: string }[];
  data: Tournament[] | undefined;
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

  const startAt = parseISO(start_at);
  const date = format(startAt, "MMM d, yyyy h:mm a");

  return date;
};

interface RenderCellProps {
  row: Tournament;
  columnKey: React.Key;
}

const renderCell = ({ row, columnKey }: RenderCellProps) => {
  const { id, name, organization, start_at, player_count, player_cap } = row;

  switch (columnKey) {
    case "organization.name":
      return <Link href={`/organizations/${organization.slug}`}> {organization.name} </Link>;
    case "start_at":
      return renderStartDateString(start_at);
    case "name":
      return <Link href={`/organizations/${organization.slug}/tournaments/${id}`}> {name} </Link>;
    case "players":
      return player_cap ? `${player_count}/${player_cap}` : player_count;
    case "registration":
      return renderRegistration(row);
    default:
      return null;
  }
};

export { renderCell };
