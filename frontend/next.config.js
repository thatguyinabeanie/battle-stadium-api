/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["pg"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = ["pg", ...config.externals];
      config.resolve.fallback = {
        ...config.resolve.fallback,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
