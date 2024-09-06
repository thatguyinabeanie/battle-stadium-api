/** @type {import('next').NextConfig} */
import { join } from "path";

import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: join(process.cwd(), "..", ".env.postgres") });

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const nextConfig = {
  env: {
    POSTGRES_CONNECTION_STRING: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST ?? "localhost"}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  },
  reactStrictMode: true,
};

export default nextConfig;
