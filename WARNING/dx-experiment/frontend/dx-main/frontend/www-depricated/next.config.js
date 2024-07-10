/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
          },
          {
            protocol: "https",
            hostname: "aceternity.com",
          },
          {
            protocol: "https",
            hostname: "pbs.twimg.com",
          },
        ],
      },
}

module.exports = nextConfig
