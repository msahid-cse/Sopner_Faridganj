require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const donors = [
    {
        name: "Md. Sahid",
        group: "B+",
        zila: "Chandpur",
        upazila: "ফরিদগঞ্জ",
        phone: "01407531529",
        lastDonation: "নতুন দাতা",
        contactMethods: "Whatsapp, Imo, Call, Message",
        facebookUrl: "https://www.facebook.com/msahid.cse"
    },
    {
        name: "Md. Arman",
        group: "A+",
        zila: "চাঁদপুর",
        upazila: "ফরিদগঞ্জ",
        phone: "01871351876",
        lastDonation: "23/11/2025",
        contactMethods: "Whatsapp",
        facebookUrl: ""
    }
];

async function seed() {
    try {
        await client.connect();
        console.log('Connected to database');

        // table might not exist if server hasn't run yet? 
        // seed.js should probably create table if not exists too.
        // But server.js does it.
        // I will assume server.js runs first or I add create table here too.

        await client.query(`
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
        `);

        const checkQuery = 'SELECT COUNT(*) FROM donors';
        const checkResult = await client.query(checkQuery);

        if (parseInt(checkResult.rows[0].count) > 0) {
            console.log('Database already has data (Donors). Checking Admin...');
        } else {
            console.log('Seeding donors data...');
            const query = `
                INSERT INTO donors (name, blood_group, zila, upazila, phone, last_donation, contact_methods, facebook_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `;

            for (const donor of donors) {
                await client.query(query, [
                    donor.name,
                    donor.group,
                    donor.zila,
                    donor.upazila,
                    donor.phone,
                    donor.lastDonation,
                    donor.contactMethods,
                    donor.facebookUrl
                ]);
            }
            console.log('Donors seeding completed');
        }

        // Seed Admin
        const adminCheck = await client.query('SELECT COUNT(*) FROM admins');
        if (parseInt(adminCheck.rows[0].count) === 0) {
            console.log('Seeding admin user...');
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);

            await client.query('INSERT INTO admins (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Admin user created: admin / admin123');
        } else {
            console.log('Admin user already exists');
        }

        console.log('Seeding completed successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await client.end();
    }
}

seed();
