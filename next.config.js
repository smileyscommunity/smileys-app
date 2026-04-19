/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/app',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
