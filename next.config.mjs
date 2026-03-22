/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'is1-1.housingcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'is1-2.housingcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'is1-3.housingcdn.com',
      }
    ],
  },
};

export default nextConfig;
