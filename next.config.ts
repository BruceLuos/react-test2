import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 120, // nextjs15以前页面默认会缓存，现在nextjs15需要配置才会启动缓存，这里设置30秒缓存，减少tag数据多次请求
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/*",
      },
    ],
  },
};

export default nextConfig;
