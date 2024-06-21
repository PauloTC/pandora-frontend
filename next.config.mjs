/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "data-center-strapi.s3.sa-east-1.amazonaws.com",
      "bucket-pandora.s3.sa-east-1.amazonaws.com",
    ],
  },
};
export default nextConfig;
