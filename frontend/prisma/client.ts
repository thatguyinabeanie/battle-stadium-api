import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import ws from "ws";
import { env } from "@/env.mjs";

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${env.NEON_DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;

export { prisma };
