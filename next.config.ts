import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // تمام درخواست‌های /api/... را هندل می‌کند
  //       destination: "https://teamim.org/beauty/api/:path*", // ریدایرکت به سرور اصلی
  //     },
  //   ];
  // },
};

export default nextConfig;
