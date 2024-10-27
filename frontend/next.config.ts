import type { NextConfig } from "next";

import { join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    cssChunking: "loose", // default
    // how many times Next.js will retry failed page generation attempts
    // before failing the build
    staticGenerationRetryCount: 1,
    // how many pages will be processed per worker
    staticGenerationMaxConcurrency: 8,
    // the minimum number of pages before spinning up a new export worker
    staticGenerationMinPagesPerWorker: 25,
  },
  expireTime: 3600,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokepast.es",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "limitlesstcg.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
