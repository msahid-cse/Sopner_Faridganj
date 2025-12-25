// Create table and insert blood donors data using parameterized queries
require('dotenv').config();
const { query } = require('./config/database');

async function setupBloodDonors() {
    console.log('🩸 Setting up blood donors...\n');

    try {
        // Step 1: Create table
        console.log('📋 Creating blood_donors table...');
        const createTableSQL = `
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
            );

            CREATE INDEX IF NOT EXISTS idx_blood_group ON blood_donors(blood_group);
            CREATE INDEX IF NOT EXISTS idx_district ON blood_donors(district);
            CREATE INDEX IF NOT EXISTS idx_upazila ON blood_donors(upazila);
            CREATE INDEX IF NOT EXISTS idx_is_available ON blood_donors(is_available);
        `;

        await query(createTableSQL);
        console.log('✅ Table created successfully!\n');

        // Step 2: Insert data using parameterized queries
        console.log('📝 Inserting blood donors data...');

        const donors = [
            {
                name: 'Md. Sahid',
                blood_group: 'B+',
                district: 'Chandpur',
                upazila: 'ফরিদগঞ্জ',
                phone: '01407531529',
                last_donation: 'নতুন দাতা',
                contact_methods: 'Whatsapp, Imo, Call, Message',
                facebook_url: 'https://www.facebook.com/msahid.cse',
                is_available: true
            },
            {
                name: 'Md. Arman',
                blood_group: 'A+',
                district: 'চাঁদপুর',
                upazila: 'ফরিদগঞ্জ',
                phone: '01871351876',
                last_donation: '23/11/2025',
                contact_methods: 'Whatsapp',
                facebook_url: null,
                is_available: true
            }
        ];

        for (const donor of donors) {
            await query(
                `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    donor.name,
                    donor.blood_group,
                    donor.district,
                    donor.upazila,
                    donor.phone,
                    donor.last_donation,
                    donor.contact_methods,
                    donor.facebook_url,
                    donor.is_available
                ]
            );
        }

        console.log('✅ Data inserted successfully!\n');

        // Step 3: Verify
        console.log('🔍 Verifying data...');
        const result = await query('SELECT * FROM blood_donors ORDER BY id');
        console.log(`\n📊 Total donors in database: ${result.rows.length}\n`);

        result.rows.forEach((donor, index) => {
            console.log(`${index + 1}. ${donor.name}`);
            console.log(`   Blood Group: ${donor.blood_group}`);
            console.log(`   Location: ${donor.district}, ${donor.upazila}`);
            console.log(`   Phone: ${donor.phone}`);
            console.log(`   Last Donation: ${donor.last_donation}`);
            console.log(`   Available: ${donor.is_available ? 'Yes' : 'No'}`);
            console.log('');
        });

        console.log('✅ Blood donors setup complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
}

setupBloodDonors();
