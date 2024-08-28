import { join } from "path";

import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: join(process.cwd(), "..", ".env.postgres") });

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

export default defineConfig({
  schema: "./src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    database: 'fuecoco-db-dev',
    password: 'postgres',
    host: 'postgres',
    user: 'postgres',
    port: 5432,
  },
});
