/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "../.env.development.local" });

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
