/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "wp-content.taalmaatjesnederlands.nl"],
  },
};

module.exports = nextConfig;

// module.exports = {
//   distDir: "build",
// };
