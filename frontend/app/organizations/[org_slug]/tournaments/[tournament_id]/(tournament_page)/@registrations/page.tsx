import PlayersTable from "~/app/players/players-table";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import { OrganizationTournamentProps } from "~/types";

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

export default async function TournamentRegistrations(props: Readonly<OrganizationTournamentProps>) {
  const params = await props.params;
  const { tournament_id } = params;

  const { players } = await getTournamentPlayers(tournament_id);

  return <PlayersTable columns={columns} players={players?.map((p) => p.profile) ?? []} />;
}
