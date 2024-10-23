import type { NextConfig } from "next";

import { join } from "path";
import dotenv from "dotenv";
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

dotenv.config({ path: join(process.cwd(), ".env") });
dotenv.config({ path: join(process.cwd(), ".env.development.local") });

const nextConfig: NextConfig = {
  experimental: {
    after: true,
    cssChunking: "loose", // default
  },

  reactStrictMode: true,

  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  turbo: {},
};

export default withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: "main",
})(nextConfig);
