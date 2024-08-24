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
    user: "postgres",
    password: process.env.DATABASE_PASSWORD ?? "postgres",
    host: "db",
    port: 5432,
    database: "fuecoco-db-dev",
    ssl: false,
  },
});
