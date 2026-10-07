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
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/mch-v2/index.html" },
        { source: "/journal", destination: "/mch-v2/journal.html" },
        { source: "/lab", destination: "/mch-v2/lab.html" },
        { source: "/lab/skills", destination: "/mch-v2/lab/skills.html" },
        { source: "/privacy", destination: "/mch-v2/privacy.html" },
        { source: "/services", destination: "/mch-v2/services.html" },
        { source: "/studio-notes", destination: "/mch-v2/studio-notes.html" },
        { source: "/tech-misc-larp", destination: "/mch-v2/tech-misc-larp.html" },
        { source: "/updates", destination: "/mch-v2/updates.html" },
        { source: "/work", destination: "/mch-v2/work.html" },
        { source: "/work/1clickwebsite-india", destination: "/mch-v2/work/1clickwebsite-india.html" },
        { source: "/work/active-power", destination: "/mch-v2/work/active-power.html" },
        { source: "/work/asset-mantle", destination: "/mch-v2/work/asset-mantle.html" },
        { source: "/work/berglabs", destination: "/mch-v2/work/berglabs.html" },
        { source: "/work/blackfrog", destination: "/mch-v2/work/blackfrog.html" },
        { source: "/work/canterclub", destination: "/mch-v2/work/canterclub.html" },
        { source: "/work/coastal-edge-ai", destination: "/mch-v2/work/coastal-edge-ai.html" },
        { source: "/work/coastal-karnataka-sailing-club", destination: "/mch-v2/work/coastal-karnataka-sailing-club.html" },
        { source: "/work/dil-se-rave", destination: "/mch-v2/work/dil-se-rave.html" },
        { source: "/work/eaash", destination: "/mch-v2/work/eaash.html" },
        { source: "/work/falcon-fitness", destination: "/mch-v2/work/falcon-fitness.html" },
        { source: "/work/hegde-bros", destination: "/mch-v2/work/hegde-bros.html" },
        { source: "/work/ingrained-logic", destination: "/mch-v2/work/ingrained-logic.html" },
        { source: "/work/manipal-aerosports", destination: "/mch-v2/work/manipal-aerosports.html" },
        { source: "/work/mantle-works", destination: "/mch-v2/work/mantle-works.html" },
        { source: "/work/mch-art", destination: "/mch-v2/work/mch-art.html" },
        { source: "/work/meow-ops", destination: "/mch-v2/work/meow-ops.html" },
        { source: "/work/meow-wild", destination: "/mch-v2/work/meow-wild.html" },
        { source: "/work/meow-world-order-mch", destination: "/mch-v2/work/meow-world-order-mch.html" },
        { source: "/work/merak3i", destination: "/mch-v2/work/merak3i.html" },
        { source: "/work/patherle", destination: "/mch-v2/work/patherle.html" },
        { source: "/work/precision-electrical-works", destination: "/mch-v2/work/precision-electrical-works.html" },
        { source: "/work/resonance-security", destination: "/mch-v2/work/resonance-security.html" },
        { source: "/work/rhythm-jain", destination: "/mch-v2/work/rhythm-jain.html" },
        { source: "/work/stroi-analytics", destination: "/mch-v2/work/stroi-analytics.html" },
        { source: "/work/suha-rehma", destination: "/mch-v2/work/suha-rehma.html" },
        { source: "/work/tender-moments", destination: "/mch-v2/work/tender-moments.html" },
      ],
    };
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
