import { postPokemonTeam } from "@/app/server-actions/pokemon/actions";
import { ValidatedPokemon, PokePasteMetadata } from "@/lib/pokemon/common";
import { Textarea, Spacer, Button } from "@/components/nextui/client-components";
import Form from "next/form";

interface PokemonShowdownSetFormProps {
  validatedTeam: ValidatedPokemon[];
  handleSubmit: (formData: FormData) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  metaData: PokePasteMetadata | null;
}

export function PokemonShowdownSetForm({
  validatedTeam,
  handleSubmit,
  input,
  setInput,
  metaData,
}: Readonly<PokemonShowdownSetFormProps>) {
  return (
    <Form action={handleSubmit} className="grid grid-cols-1">
      <div className="mb-4">
        <h1 className="text-2xl font-bold justify-center items-center flex">{"Showdown Set"}</h1>
      </div>
      <Textarea
        isMultiline
        isRequired
        classNames={{
          input: "w-[200px]",
          inputWrapper: "backdrop-blur-md rounded-3xl border-small border-primary-700/40 p-4",
          mainWrapper: "backdrop-blur-md rounded-3xl border-small border-primary-700/40 p-4",
        }}
        maxRows={35}
        minRows={35}
        name="pokepaste"
        placeholder="Paste your Showdown Set here"
        value={input}
        variant="bordered"
        onChange={(e) => setInput(e.target.value)}
      />

      <Spacer y={2} />

      <div className="flex flex-row justify-center items-center gap-4">
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
      </div>
    </Form>
  );
}
