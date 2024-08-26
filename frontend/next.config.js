/** @type {import('next').NextConfig} */

const dotenv = require("dotenv");
const nodeExternals = require("webpack-node-externals");

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

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^cloudflare:sockets$/,
        }),
      );
    }
    // else {
    //   config.externals = [
    //     nodeExternals({
    //       allowlist: [/^node:/],
    //     }),
    //   ];
    // }
    return config;
  },
};

module.exports = nextConfig;
