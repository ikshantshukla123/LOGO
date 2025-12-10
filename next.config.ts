/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.imagekit.io", // ⭐ All ImageKit domains
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // Some projects use this format
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",       // UploadThing URLs
      },
      {
        protocol: "https",
        hostname: "**",             // TEMP (remove later if you want strict)
      },
    ],
  },
};

module.exports = nextConfig;
