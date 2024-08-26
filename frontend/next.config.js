/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");

dotenv.config();

const nextConfig = {
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

module.exports = nextConfig;
