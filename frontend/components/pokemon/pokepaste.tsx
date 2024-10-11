"use client";

import * as React from "react";
import { usePokePaste } from "@/lib/pokemon/use-poke-paste";
import { Input, Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { StatsTable } from "@pkmn/types";

export default function PokemonTeamDisplay() {
  const [url, setUrl] = React.useState<string | null>(null);
  const { teamData, loading, error } = usePokePaste(url);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputUrl = formData.get("url") as string;

    setUrl(inputUrl);
  };

  return (
    <div className="container mx-auto px-4">
      <form className="my-8" onSubmit={handleSubmit}>
        <Input fullWidth isClearable className="mb-2" name="url" placeholder="Enter PokePaste URL" />
        <Button color="primary" type="submit">
          Load Team
        </Button>
      </form>

      {loading && <div className="text-center">Loading...</div>}
      {error && <p className="text-danger">Error: {error.message}</p>}

      <div className="flex flex-wrap -mx-2">
        {teamData &&
          teamData.map((pokemon, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{pokemon.species}</h2>
                  <div className="flex items-center">
                    <Image alt={pokemon.item} height={24} src={pokemon.imgItem} width={24} />
                    <span className="ml-2 text-sm">{pokemon.item}</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex justify-center mb-4">
                    <Image alt={pokemon.species} height={120} src={pokemon.imgPokemon} width={120} />
                  </div>
                  <div className="text-sm">
                    <p>
                      <strong>Ability:</strong> {pokemon.ability}
                    </p>
                    <p>
                      <strong>Tera Type:</strong> {pokemon.teraType}
                    </p>
                    <p>
                      <strong>Nature:</strong> {pokemon.nature}
                    </p>
                    <p>
                      <strong>EVs:</strong>{" "}
                      {Object.entries(pokemon.evs)
                        .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
                        .join(" / ")}
                    </p>
                    <p>
                      <strong>IVs:</strong>{" "}
                      {Object.entries(pokemon.ivs)
                        .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
                        .join(" / ")}
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="w-full">
                    <strong className="block mb-1">Moves:</strong>
                    <ul className="list-disc list-inside">
                      {pokemon.moves.map((move, idx) => (
                        <li key={idx}>{move}</li>
                      ))}
                    </ul>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

const formatStats = (stats: StatsTable, showAll: boolean = true) => {
  return Object.entries(stats)
    .filter(([_, value]) => showAll || value !== 31)
    .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
    .join(" / ");
};

export { formatStats };
