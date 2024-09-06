import { createContentlayerPlugin } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'seo-heist.s3.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/**',
          },
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          },
        ],
      },
      redirects() {
        return [
          {
            source: "/components",
            destination: "/docs/components/accordion",
            permanent: true,
          },
          {
            source: "/docs/components",
            destination: "/docs/components/accordion",
            permanent: true,
          },
          {
            source: "/examples",
            destination: "/examples/mail",
            permanent: false,
          },
          {
            source: "/docs/primitives/:path*",
            destination: "/docs/components/:path*",
            permanent: true,
          },
          {
            source: "/figma",
            destination: "/docs/figma",
            permanent: true,
          },
          {
            source: "/docs/forms",
            destination: "/docs/components/form",
            permanent: false,
          },
          {
            source: "/docs/forms/react-hook-form",
            destination: "/docs/components/form",
            permanent: false,
          },
        ]
      },
};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
