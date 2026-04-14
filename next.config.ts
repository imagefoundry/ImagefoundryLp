import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/lp',
  assetPrefix: '/lp',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/lp',
  },
};

export default nextConfig;
