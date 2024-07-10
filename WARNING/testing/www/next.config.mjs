/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      },
      
    ],
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
    unoptimized: true,
  },
}


export default config;
