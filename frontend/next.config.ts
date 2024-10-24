import type { NextConfig } from "next";

import { join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    cssChunking: "loose", // default
  },

  reactStrictMode: true,
};

export default nextConfig;

