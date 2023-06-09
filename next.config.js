/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.boringavatars.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
