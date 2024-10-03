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
  try {
    const { data: players } = await getUsers();

    return <PlayersTable columns={columns} players={players ?? []} />;
  } catch (error) {
    console.error("Failed to load players", error); // eslint-disable-line no-console

    return <div>Failed to load players</div>;
  }
}
