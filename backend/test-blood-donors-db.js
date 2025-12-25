// Test database connection and blood_donors table
require('dotenv').config();
const { query } = require('./config/database');

async function testDatabase() {
    console.log('🔍 Testing database connection...\n');

    try {
        // Test 1: Connection
        console.log('1. Testing connection...');
        const testQuery = await query('SELECT NOW()');
        console.log('✅ Database connected!');
        console.log(`   Current time: ${testQuery.rows[0].now}\n`);

        // Test 2: Check if table exists
        console.log('2. Checking if blood_donors table exists...');
        const tableCheck = await query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'blood_donors'
            );
        `);
        const tableExists = tableCheck.rows[0].exists;
        console.log(`   Table exists: ${tableExists ? 'Yes' : 'No'}\n`);

        if (!tableExists) {
            console.log('❌ Table does not exist. Creating it now...\n');

            const createSQL = `
                CREATE TABLE blood_donors (
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
            `;

            await query(createSQL);
            console.log('✅ Table created successfully!\n');
        }

        // Test 3: Try simple insert
        console.log('3. Testing simple insert...');
        await query(
            `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, is_available)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            ['Test Donor', 'O+', 'Dhaka', 'Dhaka', '01700000000', true]
        );
        console.log('✅ Insert successful!\n');

        // Test 4: Retrieve data
        console.log('4. Retrieving data...');
        const donors = await query('SELECT * FROM blood_donors');
        console.log(`✅ Found ${donors.rows.length} donor(s)\n`);

        donors.rows.forEach((donor, i) => {
            console.log(`   ${i + 1}. ${donor.name} (${donor.blood_group})`);
        });

        console.log('\n✅ All tests passed!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('Error code:', error.code);
        console.error('Error detail:', error.detail);
        process.exit(1);
    }
}

testDatabase();
