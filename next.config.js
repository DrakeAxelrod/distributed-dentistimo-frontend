/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

/* plugins in the array */
const plugins = [];
/* config in here */
const nextConfig = {
  webpack5: true,
  env: {
    GOOGLE_MAP_API: process.env.GOOGLE_MAP_API,
  },
};

module.exports = withPlugins(plugins, nextConfig);
