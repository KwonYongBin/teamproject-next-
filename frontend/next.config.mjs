// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//     output: "standalone",
//     async rewrites() {
//     return destination: 'https://teamproject-bicycleapp.duckdns.org'
//   [
//         {
//           source: '/api/:path*',
//           destination: 'https://teamproject-bicycleapp.duckdns.org/api/:path*',
//         },
//         // CSRF 관련 주소도 rewrite에 추가하세요
//         {
//           source: '/csrf/:path*',
//           destination: 'https://teamproject-bicycleapp.duckdns.org/csrf/:path*',
//         },
//   ];
//     },
// };
const nextConfig = {
    output: "standalone",
    reactCompiler: true,
   };
export default nextConfig;