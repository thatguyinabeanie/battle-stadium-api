import PokemonTeamDisplay from "@/components/pokemon/pokepaste";

export default async function Pokemon() {
  // const teams = (await getPokemonTeams()).data;

  return (
    <div>
      <h1>Pokemon</h1>

      <PokemonTeamDisplay />
    </div>
  );
}
