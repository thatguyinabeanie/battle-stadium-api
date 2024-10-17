"use client";

import * as React from "react";
import { usePokemonTeam } from "@/lib/pokemon/use-pokemon-team";
import { Button, Spacer, Textarea } from "@/components/nextui-use-client";
import { PokemonCard } from "./pokemon-card";
import { postPokemonTeam } from "@/app/server-actions/pokemon/actions";

export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = React.useState<string>("");

  return (
    <div className="flex flex-row">
      <form className="my-8" onSubmit={handleSubmit}>
        <Textarea
          fullWidth
          isRequired
          className="mb-2 mt-8 max-h-max"
          label="Showdown Set"
          labelPlacement="outside"
          minRows={50}
          name="pokepaste"
          placeholder="Paste your Showdown Set here"
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

      <Spacer y={4} />

      <div className="grid grid-cols-1">
        {loading && <div className="text-center">Loading...</div>}
        {error && <p className="text-danger">Error: {error.message}</p>}

        {!loading && validatedTeam && (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold justify-center items-center flex">
                {metaData?.title || "Custom Team"}
              </h1>
              {metaData?.author && <p>Author: {metaData?.author}</p>}
              {metaData?.format && <p>Format: {metaData?.format}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
              {validatedTeam.map(({ pokemon, invalid }, index) =>
                pokemon ? (
                  <PokemonCard key={pokemon.species || `pokemon-${index}`} ots invalid={invalid} pokemon={pokemon} />
                ) : null,
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
