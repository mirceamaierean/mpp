/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "moarentacar.com",
      "d1gymyavdvyjgt.cloudfront.net",
      "picsum.photos",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
