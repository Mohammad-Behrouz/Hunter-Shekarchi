import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تابع rewrites را اینجا اضافه کنید
  async rewrites() {
    return [
      {
        source: "/api/v1/api/:path*",
        destination: "http://mohammadbehrouz.ir/api/:path*",
      },
    ];
  },

};

export default nextConfig;
