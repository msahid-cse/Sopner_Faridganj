// Complete setup: Create table and insert blood donors
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function completeSetup() {
    const client = await pool.connect();

    try {
        console.log('🩸 Complete Blood Donors Setup...\n');

        // Step 1: Create table
        console.log('📋 Creating blood_donors table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS blood_donors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                blood_group VARCHAR(10) NOT NULL,
                district VARCHAR(100) NOT NULL,
                upazila VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                last_donation VARCHAR(50) DEFAULT 'নতুন দাতা',
                contact_methods TEXT,
                facebook_url TEXT,
                is_available BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table created!\n');

        // Step 2: Insert donors
        console.log('📝 Inserting donors...');

        await client.query(
            `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            ['Md. Sahid', 'B+', 'Chandpur', 'ফরিদগঞ্জ', '01407531529', 'নতুন দাতা', 'Whatsapp, Imo, Call, Message', 'https://www.facebook.com/msahid.cse', true]
        );
        console.log('✅ Added Md. Sahid');

        await client.query(
            `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            ['Md. Arman', 'A+', 'চাঁদপুর', 'ফরিদগঞ্জ', '01871351876', '23/11/2025', 'Whatsapp', null, true]
        );
        console.log('✅ Added Md. Arman\n');

        // Step 3: Verify
        console.log('🔍 Verifying...');
        const result = await client.query('SELECT * FROM blood_donors ORDER BY id');
        console.log(`\n📊 Total donors: ${result.rows.length}\n`);

        result.rows.forEach((donor, i) => {
            console.log(`${i + 1}. ${donor.name} (${donor.blood_group})`);
            console.log(`   ${donor.district}, ${donor.upazila}`);
            console.log(`   ${donor.phone}`);
            console.log('');
        });

        console.log('✅ Setup complete!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

completeSetup()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
