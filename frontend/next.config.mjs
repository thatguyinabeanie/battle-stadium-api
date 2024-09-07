/** @type {import('next').NextConfig} */
import { join } from "path";

import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: join(process.cwd(), "..", ".env.development.local") });

const nextConfig = {
  env: {
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },
  reactStrictMode: true,
  experimental: {},
};

export default nextConfig;
