import { ValidatedPokemon } from "@/lib/pokemon/common";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { StatsTable } from "@pkmn/types";
import Image from "next/image";
const formatStats = (stats?: Partial<StatsTable>, showAll: boolean = true) => {
  if (!stats) return "";

  return Object.entries(stats)
    .filter(([_, value]) => showAll || value !== 31)
    .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
    .join(" / ");
};

interface ValidatedPokemonProps {
  validatedPokemon: ValidatedPokemon;
}

function PokemonName({ validatedPokemon: { pokemon } }: Readonly<ValidatedPokemonProps>) {
  const { name, species } = pokemon;

  if (name && name !== species) {
    return (
      <h2 className="text-lg font-bold">
        {name} ({species})
      </h2>
    );
  }

  return <h2 className="text-lg font-bold">{species}</h2>;
}

export function PokemonCard(props: Readonly<ValidatedPokemonProps>) {
  const { validatedPokemon } = props;
  const { pokemon, invalid } = validatedPokemon;

  return (
    <Card
      key={JSON.stringify(pokemon)}
      className="h-[400px] w-[400px] bg-transparent backdrop-blur-md rounded-3xl border-small border-neutral-400/20"
    >
      <CardHeader className="flex justify-between items-center p-4">
        <PokemonName validatedPokemon={validatedPokemon} />
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
          {pokemon.ivs && Object.keys(pokemon.ivs).length > 0 && (
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
        </div>
      </CardFooter>
    </Card>
  );
}
