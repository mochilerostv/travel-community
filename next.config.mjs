/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app']
    }
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
}

export default nextConfig
