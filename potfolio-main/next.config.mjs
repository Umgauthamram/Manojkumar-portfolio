import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'potfolio-ashkan.vercel.app', // typo domain
          },
        ],
        destination: 'https://portfolio-ashkan.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
