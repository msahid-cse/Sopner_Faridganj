require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : [
        'https://shwapner-faridganj.netlify.app',
        'https://sopner-faridganj.netlify.app',
        'http://localhost:3000'
    ];
// Add standard local development ports and 'null' for local file access
const devOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500', 'null'];
const allOrigins = [...allowedOrigins, ...devOrigins];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        // Check if origin is in our allowed list
        // We compare directly or need to handle "null" string/value carefully
        if (allOrigins.indexOf(origin) !== -1 || allOrigins.indexOf(String(origin)) !== -1) {
            return callback(null, true);
        }

        // Optional: Allow all localhost ports for dev friendliness? 
        // For now, sticking to specific list + env vars
        console.log('Blocked CORS for:', origin);
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true
}));


app.use(express.json());

// Database Connection
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        createTables();
    })
    .catch(err => console.error('Connection error', err.stack));

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ... (previous code)

// Create Tables
const createTables = async () => {
    // Donors Table
    const donorsQuery = `
        CREATE TABLE IF NOT EXISTS donors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            blood_group VARCHAR(10) NOT NULL,
            zila VARCHAR(50) NOT NULL,
            upazila VARCHAR(50) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            last_donation VARCHAR(50),
            contact_methods VARCHAR(255),
            facebook_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Admins Table
    const adminsQuery = `
        CREATE TABLE IF NOT EXISTS admins (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await client.query(donorsQuery);
        await client.query(adminsQuery);
        console.log('Tables created or already exist');

        // Seed Admin User if not exists
        const adminCheck = await client.query('SELECT * FROM admins WHERE username = $1', ['admin']);
        if (adminCheck.rows.length === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await client.query('INSERT INTO admins (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Default admin user seeded');
        }
    } catch (err) {
        console.error('Error creating/seeding tables', err);
    }
};

// Middleware to verify Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

// Routes

// Default Root Route
app.get('/', (req, res) => {
    res.send('Welcome to Sopner Faridganj API Server is Running!');
});

// Admin Login (POST)
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM admins WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const admin = result.rows[0];
        if (await bcrypt.compare(password, admin.password)) {
            const accessToken = jwt.sign({ username: admin.username }, process.env.JWT_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.status(403).json({ error: 'Invalid password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin Login (GET) - For browser testing friendliness
app.get('/api/admin/login', (req, res) => {
    res.send('This endpoint is for POST requests (Login). Please use the Admin Panel UI.');
});

// Get all donors (Public)
app.get('/api/blood-bank/donors', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM donors ORDER BY id DESC');
        // Map database fields to frontend expected format
        const donors = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            group: row.blood_group,
            zila: row.zila,
            upazila: row.upazila,
            phone: row.phone,
            lastDonation: row.last_donation,
            contactMethods: row.contact_methods,
            facebookUrl: row.facebook_url
        }));
        res.json(donors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new donor (Protected)
app.post('/api/blood-bank/donors', authenticateToken, async (req, res) => {
    const { name, group, zila, upazila, phone, lastDonation, contactMethods, facebookUrl } = req.body;
    try {
        const query = `
            INSERT INTO donors (name, blood_group, zila, upazila, phone, last_donation, contact_methods, facebook_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [name, group, zila, upazila, phone, lastDonation, contactMethods, facebookUrl];
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a donor (Protected)
app.put('/api/blood-bank/donors/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, group, zila, upazila, phone, lastDonation, contactMethods, facebookUrl } = req.body;
    try {
        const query = `
            UPDATE donors 
            SET name = $1, blood_group = $2, zila = $3, upazila = $4, phone = $5, last_donation = $6, contact_methods = $7, facebook_url = $8
            WHERE id = $9
            RETURNING *
        `;
        const values = [name, group, zila, upazila, phone, lastDonation, contactMethods, facebookUrl, id];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a donor (Protected)
app.delete('/api/blood-bank/donors/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM donors WHERE id = $1 RETURNING *';
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donor not found' });
        }

        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
