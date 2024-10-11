"use client";

import * as React from "react";
import { usePokePaste } from "@/lib/pokemon/use-poke-paste";
import { Input, Button, Card, Spacer, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

export default function PokemonTeamDisplay() {
  const [url, setUrl] = React.useState<string | null>(null);
  const { teamData, loading, error } = usePokePaste(url);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputUrl = formData.get("url") as string;

    setUrl(inputUrl);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <p color="error">Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input fullWidth isClearable name="url" placeholder="Enter PokePaste URL" />
        <Spacer y={0.5} />
        <Button type="submit">Load Team</Button>
      </form>
      <Spacer y={1} />
      {teamData &&
        teamData.map((pokemon, index) => (
          <Card key={index}>
            <CardHeader>
              <h2>{pokemon.species}</h2>
            </CardHeader>
            <CardBody>
              <Image alt={pokemon.species} height={100} src={pokemon.imgPokemon} width={100} />

              <p>Item: {pokemon.item}</p>
              <Image alt={pokemon.item} height={50} src={pokemon.imgItem} width={50} />

              <p>Ability: {pokemon.ability}</p>
              <p>Tera Type: {pokemon.teraType}</p>
              <p>Nature: {pokemon.nature}</p>
              <p>Moves: {pokemon.moves.join(", ")}</p>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}
