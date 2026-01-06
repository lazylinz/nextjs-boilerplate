/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: {
    // Enable experimental features if needed
  },
  env: {
    // Add environment variables here
  },
};

module.exports = nextConfig;
