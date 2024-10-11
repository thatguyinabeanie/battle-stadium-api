"use client";

import * as React from "react";
import { usePokemonTeam } from "@/lib/pokemon/use-pokemon-team";
import { Button, Textarea } from "@/components/nextui-use-client";
import { PokemonCard } from "./pokemon-card";

export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = React.useState<string>("");

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
        {validatedTeam.map((pokemon) => (
          <PokemonCard key={JSON.stringify(pokemon)} validatedPokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
