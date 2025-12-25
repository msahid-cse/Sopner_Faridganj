// Migration: Seed Blood Donors Data
const { query } = require('../config/database');

async function up() {
    console.log('🌱 Seeding blood donors data...');

    const bloodDonors = [
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
            facebook_url: '',
            is_available: true
        }
    ];

    try {
        // Delete existing data first
        await query('DELETE FROM blood_donors');

        for (const donor of bloodDonors) {
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
                    donor.facebook_url || null,
                    donor.is_available
                ]
            );
        }

        console.log('✅ Blood donors seeded successfully!');
        console.log(`📊 Total donors added: ${bloodDonors.length}`);
    } catch (error) {
        console.error('❌ Error seeding blood donors:', error);
        throw error;
    }
}

async function down() {
    console.log('🗑️  Removing seeded blood donors...');

    try {
        await query('DELETE FROM blood_donors');
        console.log('✅ Seeded blood donors removed successfully!');
    } catch (error) {
        console.error('❌ Error removing blood donors:', error);
        throw error;
    }
}

module.exports = { up, down };
