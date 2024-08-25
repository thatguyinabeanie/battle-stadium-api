import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";

const dbCredentials = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      user: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      host: process.env.POSTGRES_HOST as string,
      database: process.env.POSTGRES_DB as string,
      port: parseInt((process.env.POSTGRES_PORT as string)),
    }
  }

  config({ path: "../.env.postgres" });
  config({ path: ".env" });
  config({ path: ".env.local" });

  return {
    user: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    host: process.env.HOST_ENVIRONMENT === "container" ? "db" : "localhost",
    database: process.env.POSTGRES_DB ?? "fuecoco-db-dev",
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  }
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
  dbCredentials: dbCredentials(),
});
