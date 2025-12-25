// Migration: Create Blood Donors Table
const { query } = require('../config/database');

async function up() {
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

    try {
        await query(createTableSQL);
        console.log('✅ blood_donors table created successfully!');
    } catch (error) {
        console.error('❌ Error creating blood_donors table:', error);
        throw error;
    }
}

async function down() {
    console.log('🗑️  Dropping blood_donors table...');

    try {
        await query('DROP TABLE IF EXISTS blood_donors CASCADE');
        console.log('✅ blood_donors table dropped successfully!');
    } catch (error) {
        console.error('❌ Error dropping blood_donors table:', error);
        throw error;
    }
}

module.exports = { up, down };
