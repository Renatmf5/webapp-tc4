/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desativa o linting durante o build
  },
  typescript: {
    ignoreBuildErrors: true, // Permite que o build continue mesmo com erros de tipos
  },
};

module.exports = nextConfig;