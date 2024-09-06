/** @type {import('next').NextConfig} */
import { join } from "path";

import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: join(process.cwd(), "..", ".env.development.local") });


const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
