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
    database: POSTGRES_DB as string,
    password: POSTGRES_PASSWORD as string,
    host: POSTGRES_HOST as string,
    user: POSTGRES_USER as string,
    port: parseInt(POSTGRES_PORT as string, 10),
  },
});
