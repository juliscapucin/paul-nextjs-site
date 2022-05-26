/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "pauldeheer.wordpresssites.host",
      "next.config.js",
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   distDir: "build",
// };
