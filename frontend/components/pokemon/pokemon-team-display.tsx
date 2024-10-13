"use client";

import * as React from "react";
import { usePokemonTeam } from "@/lib/pokemon/use-pokemon-team";
import { Button, Textarea } from "@/components/nextui-use-client";
import { PokemonCard } from "./pokemon-card";
import { postPokemonTeam } from "@/app/data/pokemon/actions";

export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = React.useState<string>("");

  return (
    <>
      <form className="my-8" onSubmit={handleSubmit}>
        <Textarea
          fullWidth
          className="mb-2"
          maxRows={10}
          minRows={3}
          name="pokepaste"
          placeholder="Paste your PokePaste URL or Showdown Set here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" type="submit">
          Load Team
        </Button>
        <Button
          color="primary"
          disabled={!validatedTeam || !metaData}
          onClick={() => validatedTeam && metaData && postPokemonTeam(validatedTeam, metaData)}
        >
          Upload
        </Button>
      </form>

      {loading && <div className="text-center">Loading...</div>}
      {error && <p className="text-danger">Error: {error.message}</p>}

      {!loading && validatedTeam && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{metaData?.title || "Custom Team"}</h1>
            {metaData?.author && <p>Author: {metaData?.author}</p>}
            {metaData?.format && <p>Format: {metaData?.format}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
            {validatedTeam?.map(({ pokemon, invalid }) => (
              <PokemonCard key={pokemon.species} ots invalid={invalid} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
