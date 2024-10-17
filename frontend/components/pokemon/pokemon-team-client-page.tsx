"use client";

import * as React from "react";
import { usePokemonTeam } from "@/lib/pokemon/use-pokemon-team";
import { Spacer } from "@/components/nextui-use-client";
import { PokemonCard } from "./pokemon-card";
import { PokemonShowdownSetForm } from "./pokemon-showdown-set-form";
import { PokemonTeamDisplayGrid } from "./pokemon-team-display-grid";


export default function PokemonTeamDisplay() {
  const { validatedTeam, metaData, loading, error, handleSubmit } = usePokemonTeam();
  const [input, setInput] = React.useState<string>("");

  return (
    <div className="flex flex-row gap-2">
      <PokemonShowdownSetForm
        validatedTeam={validatedTeam ?? []}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        metaData={metaData}
      />

      <Spacer y={4} />

      <div className="grid grid-cols-1">
        {loading && <div className="text-center">Loading...</div>}
        {error && <p className="text-danger">Error: {error.message}</p>}

        {!loading && validatedTeam && (
          <PokemonTeamDisplayGrid validatedTeam={validatedTeam} metaData={metaData} />
        )}
      </div>
    </div>
  );
}
