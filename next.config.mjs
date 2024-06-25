/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
        USER_ID: process.env.USER_ID,
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    },
    images: {
        domains: ['scontent.cdninstagram.com']
    },
};

export default nextConfig;
