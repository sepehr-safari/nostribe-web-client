/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: 'edge', // for cloudflare
  },
};

module.exports = nextConfig;
