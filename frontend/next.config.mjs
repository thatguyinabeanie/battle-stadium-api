/** @type {import('next').NextConfig} */
import { join } from "path";
import dotenv from "dotenv";

import { env } from "./env.mjs";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

export default async function nextConfig(_phase, { defaultConfig }) {
  const nextConfig = {
    ...defaultConfig,

    images: {
      ...defaultConfig.images,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "pokepast.es",
        },
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
        },
      ],
    },

    env: {
      ...defaultConfig.env,
      MEASUREMENT_ID: env.MEASUREMENT_ID,
    },

    reactStrictMode: true,

    compiler: {
      ...defaultConfig.compiler,
      removeConsole: {
        exclude: ["error"],
      },
    },
  };

  return nextConfig;
}
