"use client";

import { useState } from "react";
import { usePokemonTeam } from "~/lib/pokemon/use-pokemon-team";
import { Spacer } from "~/components/nextui/client-components";
import { PokemonShowdownSetForm } from "./pokemon-showdown-set-form";
import { PokemonTeamDisplayGrid } from "./pokemon-team-display-grid";

export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-row gap-2">
      <PokemonShowdownSetForm
        handleSubmit={handleSubmit}
        input={input}
        metaData={metaData}
        setInput={setInput}
        validatedTeam={validatedTeam ?? []}
      />

      <Spacer y={4} />

      <div className="grid grid-cols-1">
        {loading && <div className="text-center">Loading...</div>}
        {error && <p className="text-danger">Error: {error.message}</p>}

        {!loading && validatedTeam && <PokemonTeamDisplayGrid metaData={metaData} validatedTeam={validatedTeam} />}
      </div>
    </div>
  );
}
