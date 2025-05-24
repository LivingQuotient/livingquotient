import { withContentlayer } from "next-contentlayer";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"]
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"]
  },
  webpack(config) {
    config.resolve.alias["@" ] = path.resolve(__dirname);
    return config;
  }
};

export default withContentlayer(nextConfig);
