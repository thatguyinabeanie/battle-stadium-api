import { BattleStadiumAPI, components } from "@/lib/battle-stadium-api";

import PlayersTable from "./players-table";

type User = components["schemas"]["User"];

async function fetchPlayers(): Promise<User[]> {
  return (await BattleStadiumAPI().Users.list()).data ?? [];
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
