import { BattleStadiumAPI, components } from "@/lib/battle-stadium-api";

type User = components["schemas"]["User"];

async function fetchPlayers () {
  return (await BattleStadiumAPI().Users.list()).data;
}

const PlayersPage = async () => {
  const players = await fetchPlayers() ?? [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Pronouns</th>
            </tr>
          </thead>
          <tbody>
            { players.map((player) => (
              <tr key={ player.id } className="border-t border-gray-300">
                <td className="px-4 py-2">{ player.username }</td>
                <td className="px-4 py-2">{ player.pronouns || '-' }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersPage;
