import { components } from "@/lib/battle-stadium-api";
import { getKeyValue, Link } from "@nextui-org/react";
import { Key } from "react";


function renderRegistration ({
  registration_start_at,
  registration_end_at,
  player_count,
  player_cap,
  late_registration,
}: components["schemas"]["TournamentDetails"]) {
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

export interface RenderCellProps {
  row: components["schemas"]["Tournament"];
  columnKey: Key;
}

const RenderCell = ({row, columnKey}: RenderCellProps) => {
  const { id, name, organization, start_at, player_count, player_cap } = row;

  switch (columnKey) {
    case "organization.name":
      return <Link href={ `/organizations/${organization.id}` }>{ organization.name }</Link>;
    case "start_at":
      if (!start_at) {
        return "TBD";
      }
      const startAt = new Date(start_at);
      const date = startAt?.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const time = startAt?.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

      return `${date} ${time}`;
    case "name":
      return <Link href={ `/tournaments/${id}` }>{ name }</Link>;
    case "players":
      return player_cap ? `${player_count}/${player_cap}` : player_count;
    case "registration":
      return renderRegistration(row);
    default:
      return null;
  }
};

export default RenderCell;
