import PokemonTeamDisplay from "@/components/pokemon/pokepaste";
import { getPokemonTeams } from "../data/actions";

export default async function Pokemon() {
  // const teams = (await getPokemonTeams()).data;

  return (
    <div>
      <h1>Pokemon</h1>

      <PokemonTeamDisplay />
    </div>
  );
}
