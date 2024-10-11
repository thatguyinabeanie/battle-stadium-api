/** @type {import('next').NextConfig} */
import { join } from "path";
import { env } from "./env.mjs";
import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

export default async function nextConfig(_phase, { defaultConfig }) {
  const nextConfig = {
    ...defaultConfig,
    images: {
      ...defaultConfig.images,
      domains: ["pokepast.es"],
    },
    env: {
      ...defaultConfig.env,
      MEASUREMENT_ID: env.MEASUREMENT_ID,
    },
    reactStrictMode: true,
    webpack: (config, _options) => {
      config.module.rules.push({
        test: /\.node/,
        use: "node-loader",
      });

      return config;
    },
  };

  return nextConfig;
}
