/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // use 'standalone' if you're using SSR
    trailingSlash: true,
    images: {
      unoptimized: true, // especially for static exports
    },
  };
  
  module.exports = nextConfig;
