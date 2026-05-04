import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/donate.html", destination: "/donate", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/quran.html", destination: "/quran", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
