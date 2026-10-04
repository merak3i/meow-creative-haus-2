/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/work/sasta-hacker",
        destination: "/work/rhythm-jain",
        permanent: true,
      },
      {
        source: "/work/rhyth-jain",
        destination: "/work/rhythm-jain",
        permanent: true,
      },
      {
        source: "/work/jb-co",
        destination: "/work",
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
