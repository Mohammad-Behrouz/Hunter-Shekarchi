import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تنظیماتی که برای رفع خطای CORS در حالت dev نیاز دارید:
  allowedDevOrigins: ['158.255.74.235'],

  // تنظیمات قبلی شما:
  async rewrites() {
    return [
      {
        source: "/api/v1/api/:path*",
        destination: "https://api.iqchart.ir/api/:path*",
      },
    ];
  },
};

export default nextConfig;
