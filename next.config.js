/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rvnnmbvfcvlknwmidzfx.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
