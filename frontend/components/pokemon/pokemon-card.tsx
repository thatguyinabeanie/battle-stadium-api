import { InvalidPokemonAttributes, ParsedPokemon } from "@/lib/pokemon/common";
import { Card, CardBody, CardFooter, CardHeader, Chip } from "@nextui-org/react";
import { StatsTable } from "@pkmn/types";
import Image from "next/image";

const POKEMON_SIZE = 100;
const ITEM_SIZE = 24;

const formatStats = (stats?: Partial<StatsTable>, showAll: boolean = true) => {
  if (!stats) return "";

  return Object.entries(stats)
    .filter(([_, value]) => showAll || value !== 31)
    .map(([stat, value]) => `${value} ${stat.toUpperCase()}`)
    .join(" / ");
};

interface PokemonCardProps {
  pokemon: ParsedPokemon;
  invalid?: InvalidPokemonAttributes;
  ots?: boolean;
}

function PokemonName({ pokemon }: Readonly<PokemonCardProps>) {
  const { name, species } = pokemon;

  if (name && name !== species) {
    return (
      <div className="flex flex-row">
        <h2 className="text-lg font-bold">{name}</h2>
        <h2 className="text-lg"> ({species})</h2>
      </div>
    );
  }

  return <h2 className="text-lg font-bold">{species}</h2>;
}

export function PokemonCard(props: Readonly<PokemonCardProps>) {
  const { pokemon, ots } = props;

  return (
    <Card
      className="h-[200px] w-[350px] justify-center bg-transparent backdrop-blur-md rounded-3xl border-small border-neutral-400/20"
      shadow="md"
    >
      <CardHeader className="flex justify-center items-center p-4">
        <PokemonName pokemon={pokemon} />
      </CardHeader>
      <CardBody className="p-2 flex flex-row justify-center items-center overflow-hidden">
        <Image alt={pokemon.species} height={POKEMON_SIZE} src={pokemon.imgPokemon} width={POKEMON_SIZE} />
        <PokemonAttributes ots={ots} pokemon={pokemon} />
      </CardBody>

      <CardFooter className="p-4 w-full flex flex-row justify-around">
        {pokemon.moves.map((move) => (
          <PokemonMoveChip key={`${pokemon.species}.${move}`} move={move} />
        ))}
      </CardFooter>
    </Card>
  );
}

function PokemonAttributes({ pokemon, ots }: Readonly<PokemonCardProps>) {
  return (
    <div className="flex flex-col text-sm p-2">
      <p>
        <strong>Ability:</strong> {pokemon.ability}
      </p>
      <p>
        <strong>Tera Type:</strong> {pokemon.teraType}
      </p>
      <p>
        <strong>Nature:</strong> {pokemon.nature}
      </p>
      <span className="flex flex-row">
        <p>
          <span className="flex flex-row justify-around">
            <strong>Item:</strong>
            <p> {pokemon.item}</p>{" "}
            <Image alt={pokemon.item} height={ITEM_SIZE} src={pokemon.imgItem} width={ITEM_SIZE} />{" "}
          </span>
        </p>
      </span>
      {!ots && (
        <p>
          <strong>EVs:</strong> {formatStats(pokemon.evs, true)}
        </p>
      )}
      {!ots && pokemon.ivs && Object.keys(pokemon.ivs).length > 0 && (
        <p>
          <strong>IVs:</strong> {formatStats(pokemon.ivs, false)}
        </p>
      )}
    </div>
  );
}

export default function PokemonMoveChip({ move }: { move: string }) {
  return (
    <Chip
      classNames={{
        base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
        content: "drop-shadow shadow-black dark:shadow-white light:shadow-black",
      }}
      size="sm"
      variant="shadow"
    >
      {move}
    </Chip>
  );
}
