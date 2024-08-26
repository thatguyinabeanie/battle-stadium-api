import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://postgres:postgres@${process?.env?.BACKEND_HOST ?? "localhost"}:5432/fuecoco-db-dev`,
  },
});
