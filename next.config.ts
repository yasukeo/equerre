import { readFileSync } from "node:fs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

type Curriculum = {
  programmes: { slug: string; levels: { code: string }[] }[];
};

// Before programmes (D-094), a course address named a stream: `/cours/2bac-pc/…`. Each stream
// now leads to its programme, `/cours/2bac-sciences-experimentales/…`, with a permanent
// redirect a search engine follows.
const curriculum = JSON.parse(
  readFileSync(new URL("./supabase/curriculum/maths.json", import.meta.url), "utf8"),
) as Curriculum;
const streamRedirects = curriculum.programmes.flatMap((programme) =>
  programme.levels
    .map((level) => level.code.toLowerCase())
    .filter((stream) => stream !== programme.slug)
    .flatMap((stream) => [
      { source: `/cours/${stream}`, destination: `/cours/${programme.slug}`, permanent: true },
      {
        source: `/cours/${stream}/:path*`,
        destination: `/cours/${programme.slug}/:path*`,
        permanent: true,
      },
    ]),
);

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
  redirects: async () => streamRedirects,
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
