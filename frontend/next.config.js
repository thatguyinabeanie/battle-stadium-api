/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  env: {
    API_BASE_URL: `http://${process.env.BACKEND_HOST || "localhost"}:3000`,
  },
};

module.exports = nextConfig
