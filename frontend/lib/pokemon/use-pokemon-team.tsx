"use client";

import { ParsedPokemon, ParsedTeam, PokePasteMetadata, ValidatedPokemon } from "./common";
import { parseShowdownFormat } from "./parse-showdown-format";
import { parsePokePasteHTML } from "./parse-pokepaste-html";
import React from "react";

async function fetchAndParse(input: string): Promise<ParsedTeam> {
  if (input.startsWith("https://pokepast.es/")) {
    // Existing URL parsing logic
    const response = await fetch("/api/pokemon/pokepaste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: input }),
    });
    const html = await response.text();

    return parsePokePasteHTML(html, input);
  } else {
    // Direct input parsing logic
    return parseShowdownFormat(input);
  }
}

async function validatePokemon(pokemon: ParsedPokemon): Promise<ValidatedPokemon> {
  const response = await fetch("/api/pokemon/team/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pokemon }),
  });

  return (await response.json()) as ValidatedPokemon;
}

export function usePokemonTeam() {
  const [metaData, setMetaData] = React.useState<PokePasteMetadata | null>(null);
  const [validatedTeam, setValidatedTeam] = React.useState<ValidatedPokemon[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const parseInput = React.useCallback(async (input: string) => {
    setLoading(true);
    setError(null);

    try {
      const parsedData = await fetchAndParse(input);

      setMetaData(parsedData.metadata);
      const validatedPokemon = await Promise.all(parsedData.pokemon.map(validatePokemon));

      setValidatedTeam(validatedPokemon);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (formData: FormData) => {
    const inputUrl = formData.get("pokepaste") as string;

    parseInput(inputUrl);
  };

  return { validatedTeam, metaData, loading, error, handleSubmit };
}
