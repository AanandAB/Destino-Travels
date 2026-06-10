/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  ...(isGithubPages && {
    basePath: '/Destino-Travels',
    assetPrefix: '/Destino-Travels',
  }),
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
