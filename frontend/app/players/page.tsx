import PlayersTable from "@/app/players/players-table";
import { getUsers } from "../data/actions";

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
  const players = await getUsers();

  return <PlayersTable columns={columns} players={players} />;
}
