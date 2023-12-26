/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['http://localhost:3001/', 'http://127.0.0.1:3001'],
  },
};

module.exports = nextConfig;
