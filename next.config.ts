import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useOffline: true,
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
