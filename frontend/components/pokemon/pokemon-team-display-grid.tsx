import { ValidatedPokemon, PokePasteMetadata } from "@/lib/pokemon/common";
import { PokemonCard } from "./pokemon-card";

interface PokemonShowdownSetFormProps {
  validatedTeam: ValidatedPokemon[] | null;
  metaData: PokePasteMetadata | null;
}

export function PokemonTeamDisplayGrid ({ validatedTeam, metaData }: PokemonShowdownSetFormProps) {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold justify-center items-center flex">
          { metaData?.title || "Custom Team" }
        </h1>
        { metaData?.author && <p>Author: { metaData?.author }</p> }
        { metaData?.format && <p>Format: { metaData?.format }</p> }
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
        { validatedTeam?.map(({ pokemon, invalid }, index) =>
          pokemon ? (
            <PokemonCard key={ pokemon.species || `pokemon-${index}` } ots invalid={ invalid } pokemon={ pokemon } />
          ) : null,
        ) }
      </div>
    </>
  );
}
