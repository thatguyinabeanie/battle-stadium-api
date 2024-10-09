import PlayersTable from "@/app/players/players-table";
import { getPlayerProfiles } from "../data/actions";

const columns = [
  {
    key: "username",
    label: "Username",
  },
  {
    key: "pronouns",
    label: "Pronouns",
  },
];

async function fetchPlayers() {
  try {
    const { data: players } = await getPlayerProfiles();

    return players ?? [];
  } catch (error) {
    console.error("Failed to load players", error); // eslint-disable-line no-console

    return [];
  }
}

export default async function PlayersPage() {
  const players = await fetchPlayers();

  return <PlayersTable columns={columns} players={players} />;
}
