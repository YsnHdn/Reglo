import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "www.marjane.ma",
        pathname: "/media/catalog/product/**",
      },
      {
        protocol: "https",
        hostname: "www.marjanemall.ma",
        pathname: "/media/catalog/product/**",
      },
      {
        protocol: "https",
        hostname: "aswakassalam.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
