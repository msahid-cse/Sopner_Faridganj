const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test Cloudinary connection
const testConnection = async () => {
    try {
        const result = await cloudinary.api.ping();
        console.log('✅ Connected to Cloudinary:', result);
        return true;
    } catch (error) {
        console.error('❌ Cloudinary connection error:', error);
        return false;
    }
};

module.exports = {
    cloudinary,
    testConnection
};
