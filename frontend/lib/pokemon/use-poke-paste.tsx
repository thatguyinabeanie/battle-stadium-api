import { useState, useEffect } from "react";
import { parsePokePasteHTML } from "./parse-pokepaste-html";
import { PokePasteResults, ParsedTeam } from "./common";

export function usePokePaste(url?: string | null): PokePasteResults {
  const [teamData, setTeamData] = useState<ParsedTeam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    async function fetchTeamData(url: string) {
      try {
        const response = await fetch("/api/pokepaste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const html = await response.text();
        const parsedData = parsePokePasteHTML(html);

        setTeamData(parsedData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        setLoading(false);
      }
    }

    if (!url) {
      setLoading(false);

      return;
    }
    if (!/^https:\/\/pokepast\.es\/[a-zA-Z0-9]+$/.test(url)) {
      setError(new Error("Invalid URL format"));
      setLoading(false);

      return;
    }
    fetchTeamData(url);
  }, [url]);

  return { teamData, loading, error };
}

