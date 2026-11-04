import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ignore TypeScript errors during production builds */
  typescript: {
    ignoreBuildErrors: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;