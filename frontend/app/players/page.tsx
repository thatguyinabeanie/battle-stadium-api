import PlayersTable from "~/app/players/players-table";
import { getProfiles } from "~/app/server-actions/profiles/actions";

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
  const { data: players } = await getProfiles();

  return <PlayersTable columns={columns} players={players ?? []} />;
}
