import { getPokemonTeams } from "../data/actions";

export default async function Pokemon() {
  const teams = (await getPokemonTeams()).data;

  console.log("teams", teams);

  return (
    <div>
      <h1>Pokemon</h1>
      <p>Coming soon</p>
    </div>
  );
}
