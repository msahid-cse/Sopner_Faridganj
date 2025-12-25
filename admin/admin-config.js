// Admin Panel Configuration
const CONFIG = {
    // API URL - Production Vercel Backend
    API_URL: 'https://sopner-faridganj-api.vercel.app/api',

    // Cloudinary Configuration
    CLOUDINARY: {
        CLOUD_NAME: 'dvvrhif9d',
        UPLOAD_PRESET: 'sopner_faridganj', // Custom preset with organized folder structure
        API_KEY: '5aPuL3Tb7E4uh-3Gf-4oY1nZ9tY'
    },

    // Admin Credentials (In production, this should be in backend with hashing)
    ADMIN_USERS: [
        {
            username: 'admin',
            password: 'sopner2024', // Change this!
            name: 'Administrator'
        }
    ],

    // Session timeout (in milliseconds)
    SESSION_TIMEOUT: 3600000, // 1 hour

    // Pagination
    ITEMS_PER_PAGE: 10,

    // Blood Groups
    BLOOD_GROUPS: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],

    // Districts
    DISTRICTS: [
        'চাঁদপুর', 'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল',
        'সিলেট', 'রংপুর', 'ময়মনসিংহ', 'কুমিল্লা', 'নারায়ণগঞ্জ'
    ],

    // Upazilas (for Chandpur)
    UPAZILAS: [
        'ফরিদগঞ্জ', 'চাঁদপুর সদর', 'হাইমচর', 'কচুয়া', 'মতলব উত্তর',
        'মতলব দক্ষিণ', 'হাজীগঞ্জ', 'শাহরাস্তি'
    ],

    // Market Days
    MARKET_DAYS: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],

    // Years
    YEARS: [2024, 2025, 2026],

    // Colors for statistics
    COLORS: ['emerald', 'blue', 'purple', 'amber', 'red', 'green', 'indigo', 'pink']
};

// Export for use in other files
window.CONFIG = CONFIG;
