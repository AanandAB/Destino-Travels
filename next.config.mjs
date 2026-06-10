/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Destino-Travels',
  assetPrefix: '/Destino-Travels',
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
