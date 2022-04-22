/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "wp-content.taalmaatjesnederlands.nl",
      "next.config.js",
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   distDir: "build",
// };
