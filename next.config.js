/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/work/sasta-hacker",
        destination: "/work/rhyth-jain",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "meowcreativehaus.lovable.app",
      },
    ],
  },
};

module.exports = nextConfig;
