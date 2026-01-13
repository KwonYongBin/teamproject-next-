const nextConfig = {
  /* config options here */
  reactCompiler: true,
    output: "standalone",
    async rewrites() {
  return [
        {
          source: '/api/:path*',
          destination: 'http://54.180.89.176:9000/api/:path*',
        },
        // CSRF 관련 주소도 rewrite에 추가하세요
        {
          source: '/csrf/:path*',
          destination: 'http://54.180.89.176:9000/csrf/:path*',
        },
  ];
    },
};

export default nextConfig;