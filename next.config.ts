import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Keystatic's local admin runs on 127.0.0.1; let the dev server serve its scripts there too.
  allowedDevOrigins: ["127.0.0.1"],
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
