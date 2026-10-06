/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 서버 없이 정적 HTML로 빌드 (out/ 폴더)
  images: { unoptimized: true },
  trailingSlash: true,
  // Windows에서 개발 서버가 C:\ 시스템 파일(pagefile.sys 등)까지 감시하려다 나는 경고 방지
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "C:/*.sys", "C:/DumpStack.log.tmp"],
      };
    }
    return config;
  },
};

export default nextConfig;
