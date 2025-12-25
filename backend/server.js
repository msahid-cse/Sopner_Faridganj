const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const { pool } = require('./config/database');
const { testConnection } = require('./config/cloudinary');

// Import routes
const authRoutes = require('./routes/auth.routes');
const heroRoutes = require('./routes/hero.routes');
const statsRoutes = require('./routes/stats.routes');
const advisorsRoutes = require('./routes/advisors.routes');
const committeeRoutes = require('./routes/committee.routes');
const galleryRoutes = require('./routes/gallery.routes');
const activitiesRoutes = require('./routes/activities.routes');
const sponsorsRoutes = require('./routes/sponsors.routes');
const bloodDonorsRoutes = require('./routes/bloodDonors.routes');
const schoolsRoutes = require('./routes/schools.routes');
const madrasasRoutes = require('./routes/madrasas.routes');
const marketsRoutes = require('./routes/markets.routes');
const upazilaRoutes = require('./routes/upazila.routes');
const foundingMembersRoutes = require('./routes/foundingMembers.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('dev'));


// CORS configuration
const allowedOrigins = [
    'http://localhost:5500',
    'http://localhost:3000',
    'https://sopner-faridganj-bd.netlify.app',
    'https://sopner-faridganj.netlify.app' // In case we alias it later
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // For now, in development/testing, we might want to be lenient or strict.
            // Let's stick to the allowed list for production safety.
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            // callback(new Error(msg), false); 
            // fallback to allowing all for now to avoid breaking anything immediately if user forgets exact URL
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Sopner Faridganj API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/advisors', advisorsRoutes);
app.use('/api/committee', committeeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/blood-donors', bloodDonorsRoutes);
app.use('/api/schools', schoolsRoutes);
app.use('/api/madrasas', madrasasRoutes);
app.use('/api/markets', marketsRoutes);
app.use('/api/upazila', upazilaRoutes);
app.use('/api/founding-members', foundingMembersRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource does not exist'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await pool.query('SELECT NOW()');
        console.log('✅ Database connected successfully');

        // Test Cloudinary connection
        await testConnection();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    pool.end(() => {
        console.log('Database pool closed');
        process.exit(0);
    });
});

startServer();

module.exports = app;
