/** @type {import('next').NextConfig} */
import { join } from "path";

import dotenv from "dotenv";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.local") });

export default async function nextConfig(_phase, { defaultConfig }) {

  if(process.env.NODE_ENV !== "production") {
    console.log("NODE_ENV", process.env.NODE_ENV);
  }

  const nextConfig = {
    ...defaultConfig,
    env: {
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      ENABLE_PARTICLES: process.env.ENABLE_PARTICLES,
      API_BASE_URL: process.env.API_BASE_URL,
    },
    reactStrictMode: true,
  };

  return nextConfig;
}
