import { BattleStadiumAPI, components } from "@/lib/battle-stadium-api";
import PlayersTable from "@/app/players/players-table";

type User = components["schemas"]["User"];

async function fetchPlayers(): Promise<User[]> {
  try {
    return (await BattleStadiumAPI().Users.list()).data ?? [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch players:", error);

    return [];
  }
}

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

export default async function PlayersPage() {
  const players = await fetchPlayers();

  return <PlayersTable columns={columns} players={players} />;
}
