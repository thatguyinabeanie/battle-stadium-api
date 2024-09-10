/** @type {import('next').NextConfig} */
import { join } from "path";

import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.local") });

const nextConfig = {
  env: {
    CLERK_JWT_KEY: process.env.CLERK_JWT_KEY,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },
  reactStrictMode: true,
  experimental: {},
};

export default nextConfig;
