import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: "postgres://postgres:postgres@db:5432/fuecoco-db-dev",
  },
});
