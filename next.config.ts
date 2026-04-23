import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lp',
  assetPrefix: '/lp',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/lp',
  },
};

export default nextConfig;