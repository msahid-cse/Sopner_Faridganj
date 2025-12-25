// Insert real blood donors data
require('dotenv').config();
const { query } = require('./config/database');

async function insertRealDonors() {
    console.log('🩸 Inserting real blood donors...\n');

    try {
        // Clear test data
        console.log('🗑️  Clearing existing data...');
        await query('DELETE FROM blood_donors');
        console.log('✅ Cleared!\n');

        // Insert real donors
        console.log('📝 Inserting Md. Sahid...');
        await query(
            `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            ['Md. Sahid', 'B+', 'Chandpur', 'ফরিদগঞ্জ', '01407531529', 'নতুন দাতা', 'Whatsapp, Imo, Call, Message', 'https://www.facebook.com/msahid.cse', true]
        );
        console.log('✅ Added!\n');

        console.log('📝 Inserting Md. Arman...');
        await query(
            `INSERT INTO blood_donors (name, blood_group, district, upazila, phone, last_donation, contact_methods, facebook_url, is_available)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            ['Md. Arman', 'A+', 'চাঁদপুর', 'ফরিদগঞ্জ', '01871351876', '23/11/2025', 'Whatsapp', null, true]
        );
        console.log('✅ Added!\n');

        // Verify
        console.log('🔍 Verifying data...');
        const result = await query('SELECT * FROM blood_donors ORDER BY id');
        console.log(`\n📊 Total donors in database: ${result.rows.length}\n`);

        result.rows.forEach((donor, index) => {
            console.log(`${index + 1}. ${donor.name}`);
            console.log(`   Blood Group: ${donor.blood_group}`);
            console.log(`   Location: ${donor.district}, ${donor.upazila}`);
            console.log(`   Phone: ${donor.phone}`);
            console.log(`   Last Donation: ${donor.last_donation}`);
            console.log(`   Contact: ${donor.contact_methods || 'N/A'}`);
            console.log(`   Facebook: ${donor.facebook_url || 'N/A'}`);
            console.log(`   Available: ${donor.is_available ? 'Yes' : 'No'}`);
            console.log('');
        });

        console.log('✅ Blood donors inserted successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

insertRealDonors();
