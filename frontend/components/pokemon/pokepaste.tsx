"use client";

import * as React from "react";
import { usePokemonTeam } from "@/lib/pokemon/use-pokemon-team";
import { Button, Card, CardHeader, CardBody, CardFooter, Textarea } from "@/components/nextui-use-client";
import Image from "next/image";
import { StatsTable } from "@pkmn/types";

export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = React.useState<string>("");

  const formatStats = (stats: Partial<StatsTable>, showAll: boolean = true) => {
    return Object.entries(stats)
      .filter(([_, value]) => showAll || value !== 31)
      .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
      .join(" / ");
  };

  return (
    <div className="container mx-auto px-4">
      <form className="my-8" onSubmit={handleSubmit}>
        <Textarea
          fullWidth
          className="mb-2"
          maxRows={10}
          minRows={3}
          name="url"
          placeholder="Paste your PokePaste URL or Showdown Set here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" type="submit">
          Load Team
        </Button>
      </form>

      {loading && <div className="text-center">Loading...</div>}
      {error && <p className="text-danger">Error: {error.message}</p>}

      {validatedTeam && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{metaData?.title || "Custom Team"}</h1>
          {metaData?.author && <p>Author: {metaData?.author}</p>}
          {metaData?.format && <p>Format: {metaData?.format}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {validatedTeam.map(({ pokemon, invalid }) => (
          <Card key={JSON.stringify(pokemon)} className="h-[500px] w-full">
            <CardHeader className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold">{pokemon.species}</h2>
              <div className="flex items-center">
                <Image alt={pokemon.item} height={24} src={pokemon.imgItem} width={24} />
                <span className="ml-2 text-sm">{pokemon.item}</span>
              </div>
            </CardHeader>
            <CardBody className="p-4 overflow-y-auto">
              <div className="flex justify-center mb-4">
                <Image alt={pokemon.species} height={120} src={pokemon.imgPokemon} width={120} />
              </div>
              <div className="text-sm space-y-1">
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
                  <strong>EVs:</strong> {formatStats(pokemon.evs, true)}
                </p>
                {Object.keys(pokemon.ivs).length > 0 && (
                  <p>
                    <strong>IVs:</strong> {formatStats(pokemon.ivs, false)}
                  </p>
                )}
              </div>
            </CardBody>
            <CardFooter className="p-4">
              <div className="w-full">
                <strong className="block mb-1">Moves:</strong>
                <ul className="list-disc list-inside">
                  {pokemon.moves.map((move, idx) => (
                    <li key={`${move}-${idx}`} className={invalid.moves.includes(move) ? "text-red-500" : ""}>
                      {move}
                    </li>
                  ))}
                </ul>
                {invalid.moves.length > 0 && <p className="text-red-500 mt-2">Some moves are invalid</p>}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
