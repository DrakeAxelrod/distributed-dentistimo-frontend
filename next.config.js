/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

/* plugins in the array */
const plugins = [];
/* config in here */
const nextConfig = {
  webpack5: true,
  env: {
    customKey: "my-value",
  },
};

module.exports = withPlugins(plugins, nextConfig);
