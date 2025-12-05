/** @type {import('next').NextConfig} */
const nextConfig = {
          output: 'standalone',
          images: {
                    remotePatterns: [
                              {
                                        protocol: 'https',
                                        hostname: '**',
                              },
                    ],
          },
          // Optimize for Arabic RTL
          experimental: {
                    optimizePackageImports: ['lucide-react'],
          },
}

module.exports = nextConfig
