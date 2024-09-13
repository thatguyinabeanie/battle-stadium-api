import type { paths } from "./api-v1";

import createClient from "openapi-fetch";
export const CACHE_TIMEOUT: number = 300;

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.battlestadium.gg/api/v1"
    : `http://${process.env.BACKEND_HOST}:8080/api/v1`;

const BattleStadiumAPI = createClient<paths>({ baseUrl });

export default BattleStadiumAPI;
export { BattleStadiumAPI };
