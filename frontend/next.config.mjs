/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();
dotenv.config({ path: join(process.cwd(), "..", ".env.postgres") });

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const nextConfig = {
  env: {
    POSTGRES_CONNECTION_STRING: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST ?? "localhost"}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  },
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["pg"],
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.externals = ["pg", ...config.externals];
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    );

    return config;
  },
};

export default nextConfig;
