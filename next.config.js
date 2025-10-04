/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'picsum.photos', 'missionhopefoundation.in', 'images.unsplash.com', 'placehold.co'], // ✅ allow Cloudinary images
    },
};

module.exports = nextConfig;
