/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");

dotenv.config();

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pg"],

    turbo: {
      resolve: {
        fallback: {
          crypto: false,
        },
      },
    },
  },
};

module.exports = nextConfig;
