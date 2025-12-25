// Migration: Seed REAL Founding Members Data
const { query } = require('../config/database');

async function up() {
    console.log('🌱 Seeding REAL founding members data...');

    // First, delete any existing data
    await query('DELETE FROM founding_members');

    const foundingMembers = [
        {
            name: 'মেহেদী আশ্রাফ লিমন',
            name_en: 'Mehedi Ashraf Limon',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Edk6771q.jpg',
            display_order: 1,
            is_active: true
        },
        {
            name: 'ওসমান গনি রনি',
            name_en: 'Osman Goni Roni',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/OxGw9592Pic.jpg',
            display_order: 2,
            is_active: true
        },
        {
            name: 'তাহসিন মিলন',
            name_en: 'Tahsin Milon',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/eOu3608Gw.jpg',
            display_order: 3,
            is_active: true
        },
        {
            name: 'Md. Abdullah',
            name_en: 'Md. Abdullah',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/HxDT4530dk.jpeg',
            display_order: 4,
            is_active: true
        },
        {
            name: 'Mohammad Rabbie',
            name_en: 'Mohammad Rabbie',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Yar7506MiI.jpeg',
            display_order: 5,
            is_active: true
        },
        {
            name: 'MD RAIHAN KHAN',
            name_en: 'MD RAIHAN KHAN',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/DE3695nLw.JPG',
            display_order: 6,
            is_active: true
        },
        {
            name: 'কাউছার আলম সবুজ',
            name_en: 'Kausar Alam Sabuj',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/mP1543nI.jpg',
            display_order: 7,
            is_active: true
        },
        {
            name: 'আরাফাত হোসেন রকি',
            name_en: 'Arafat Hossain Rocky',
            role: 'প্রতিষ্ঠাতা সদস্য',
            position: 'প্রতিষ্ঠাতা',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/OKFB4884eE.jpg',
            display_order: 8,
            is_active: true
        }
    ];

    try {
        for (const member of foundingMembers) {
            await query(
                `INSERT INTO founding_members (name, name_en, role, position, institution, image_url, display_order, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    member.name,
                    member.name_en,
                    member.role,
                    member.position,
                    member.institution,
                    member.image_url,
                    member.display_order,
                    member.is_active
                ]
            );
        }

        console.log('✅ REAL Founding members seeded successfully!');
        console.log(`📊 Total founding members added: ${foundingMembers.length}`);
    } catch (error) {
        console.error('❌ Error seeding founding members:', error);
        throw error;
    }
}

async function down() {
    console.log('🗑️  Removing seeded founding members...');

    try {
        await query('DELETE FROM founding_members');
        console.log('✅ Seeded founding members removed successfully!');
    } catch (error) {
        console.error('❌ Error removing founding members:', error);
        throw error;
    }
}

module.exports = { up, down };
