export const runtime = "edge";

import PokemonTeamDisplay from "@/components/pokemon/pokemon-team-display";

export default async function Pokemon() {
  // const teams = (await getPokemonTeams()).data;

  return <PokemonTeamDisplay />;
}
