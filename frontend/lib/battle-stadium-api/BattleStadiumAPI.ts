import type { paths } from "./api-v1";

import createClient from "openapi-fetch";
export const CACHE_TIMEOUT: number = 300;

const getBaseUrl = () => {
  if (process.env.API_BASE_URL) {
    return { baseUrl: process.env.API_BASE_URL };
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.battlestadium.gg/api/v1"
      : `http://${process.env.BACKEND_HOST}:8080/api/v1`;

  return { baseUrl };
};

const BattleStadiumAPI = createClient<paths>(getBaseUrl());

export default BattleStadiumAPI;
export { BattleStadiumAPI };
