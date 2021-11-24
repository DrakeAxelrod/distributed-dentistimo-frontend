/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

const IS_DEV = process.env.NODE_ENV === "development"
if (!DEV) {
  console.log = function () {};
}

/* plugins in the array */
const plugins = [];
/* config in here */
const nextConfig = {
  webpack5: true,
  env: {
    GOOGLE_MAP_API: process.env.GOOGLE_MAP_API,
    IS_DEV: IS_DEV,
  },
};

module.exports = withPlugins(plugins, nextConfig);
