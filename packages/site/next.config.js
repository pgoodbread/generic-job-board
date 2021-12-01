/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  reactStrictMode: true,
  images: {
    domains: ["remoteok.com", "s3.us-west-1.amazonaws.com"],
  },
});
