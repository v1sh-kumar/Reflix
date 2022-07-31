/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: "imgix",
        path: process.env.NEXT_PUBLIC_API_URL,
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
