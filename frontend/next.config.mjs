/** @type {import('next').NextConfig} */
import { join } from "path";
import dotenv from "dotenv";
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";
import { env } from "./env.mjs";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

/**
 * @param {any} _phase
 */
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

  return withHydrationOverlay({
    /**
     * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
     * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
     */
    appRootSelector: "main",
  })(nextConfig);
}
