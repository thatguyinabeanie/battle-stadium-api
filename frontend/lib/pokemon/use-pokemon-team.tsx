import { useState, useCallback } from "react";
import { ParsedTeam } from "./common";
import { parseShowdownFormat } from "./parse-showdown-format";
import { parsePokePasteHTML } from "./parse-pokepaste-html";

export function usePokemonTeam() {
  const [teamData, setTeamData] = useState<ParsedTeam | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const parseInput = useCallback(async (input: string) => {
    setLoading(true);
    setError(null);

    try {
      if (input.startsWith("https://pokepast.es/")) {
        // Existing URL parsing logic
        const response = await fetch("/api/pokemon/pokepaste", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: input }),
        });
        const html = await response.text();
        const parsedData = parsePokePasteHTML(html);

        setTeamData(parsedData);
      } else {
        // New direct input parsing logic
        const parsedData = parseShowdownFormat(input);

        setTeamData(parsedData);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputUrl = formData.get("url") as string;

    parseInput(inputUrl);
  };

  return { teamData, loading, error, parseInput, handleSubmit };
}
