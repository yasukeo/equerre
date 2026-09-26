import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  // The share pictures read their typeface from disk (src/lib/og/share-image.tsx): a lesson
  // published after the build draws its picture on the server, which needs the files there.
  outputFileTracingIncludes: {
    "/**/opengraph-image*": ["./assets/fonts/*.ttf"],
  },
  experimental: {
    useOffline: true,
  },
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
