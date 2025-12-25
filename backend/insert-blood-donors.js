// Direct insert blood donors data
require('dotenv').config();
const { query } = require('./config/database');

async function insertBloodDonors() {
    console.log('🩸 Inserting blood donors data...\n');

    const sql = `
        INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
        VALUES 
        ('Md. Sahid', 'B+', 'Chandpur', 'ফরিদগঞ্জ', '01407531529', 'নতুন দাতা', 'Whatsapp, Imo, Call, Message', 'https://www.facebook.com/msahid.cse', true),
        ('Md. Arman', 'A+', 'চাঁদপুর', 'ফরিদগঞ্জ', '01871351876', '23/11/2025', 'Whatsapp', '', true);
    `;

    try {
        const result = await query(sql);
        console.log('✅ Blood donors inserted successfully!');
        console.log(`📊 Rows inserted: ${result.rowCount || 2}`);

        // Verify
        const donors = await query('SELECT * FROM blood_donors');
        console.log('\n📋 Current donors in database:');
        donors.rows.forEach(donor => {
            console.log(`   - ${donor.name} (${donor.blood_group}) - ${donor.district}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error inserting blood donors:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}

insertBloodDonors();
