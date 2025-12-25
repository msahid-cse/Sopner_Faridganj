// Migration: Seed REAL Committee Members Data for 2025
const { query } = require('../config/database');

async function up() {
    console.log('🌱 Seeding REAL committee members data for 2025...');

    // First, delete any existing dummy data
    await query('DELETE FROM committee_members WHERE year = 2025');

    const committeeMembers = [
        // Top 3 Leadership
        {
            name: 'নাজিম উদ্দিন',
            name_en: 'Nazim Uddin',
            role: 'নেতৃত্ব',
            position: 'সভাপতি',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Qt5845YE.jpg',
            year: 2025,
            display_order: 1,
            is_active: true
        },
        {
            name: 'মেহেদী আশ্রাফ লিমন',
            name_en: 'Mehedi Ashraf Limon',
            role: 'নেতৃত্ব',
            position: 'সাধারণ সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Edk6771q.jpg',
            year: 2025,
            display_order: 2,
            is_active: true
        },
        {
            name: 'জয়নাল আবেদীন',
            name_en: 'Joynal Abedin',
            role: 'নেতৃত্ব',
            position: 'অর্থ সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/wcFZ5992Ok.jpeg',
            year: 2025,
            display_order: 3,
            is_active: true
        },
        // Other Committee Members
        {
            name: 'মো: আবুল খায়ের পাবেল',
            name_en: 'Md. Abul Khayer Pabel',
            role: 'সদস্য',
            position: 'সহ-সভাপতি',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/kuaF3917dl.jpg',
            year: 2025,
            display_order: 4,
            is_active: true
        },
        {
            name: 'আল-আমিন বিজয়',
            name_en: 'Al-Amin Bijoy',
            role: 'সদস্য',
            position: 'সহ-সভাপতি',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/oZXJ5402PE.jpg',
            year: 2025,
            display_order: 5,
            is_active: true
        },
        {
            name: 'জান্নাতুন নাঈম তানিন',
            name_en: 'Jannatul Naim Tanin',
            role: 'সদস্য',
            position: 'সহ-সভাপতি',
            institution: 'প্রভাষক, ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি',
            image_url: 'https://i.imghippo.com/files/Scaw4840Ugg.jpeg',
            year: 2025,
            display_order: 6,
            is_active: true
        },
        {
            name: 'শাহেদ ইব্রাহিম',
            name_en: 'Shahed Ibrahim',
            role: 'সদস্য',
            position: 'যুগ্ম সাধারণ সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/fbhe6311Dqg.jpg',
            year: 2025,
            display_order: 7,
            is_active: true
        },
        {
            name: 'Siddiqur Rahman',
            name_en: 'Siddiqur Rahman',
            role: 'সদস্য',
            position: 'সাংগঠনিক সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/WU6194xI.jpeg',
            year: 2025,
            display_order: 8,
            is_active: true
        },
        {
            name: 'Engr. Didar Hossain',
            name_en: 'Engr. Didar Hossain',
            role: 'সদস্য',
            position: 'সহ অর্থ সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/viwN7243fI.jpeg',
            year: 2025,
            display_order: 9,
            is_active: true
        },
        {
            name: 'Md. Abdullah',
            name_en: 'Md. Abdullah',
            role: 'সদস্য',
            position: 'প্রচার সম্পাদক',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/HxDT4530dk.jpeg',
            year: 2025,
            display_order: 10,
            is_active: true
        },
        {
            name: 'Mohammad Rabbie',
            name_en: 'Mohammad Rabbie',
            role: 'সদস্য',
            position: 'অর্থ অনুমোদন',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Yar7506MiI.jpeg',
            year: 2025,
            display_order: 11,
            is_active: true
        },
        {
            name: 'ইব্রাহীম রাব্বী',
            name_en: 'Ibrahim Rabbi',
            role: 'সদস্য',
            position: 'অর্থ অনুমোদন',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/fC3640AUU.jpeg',
            year: 2025,
            display_order: 12,
            is_active: true
        },
        {
            name: 'সোহাগ পাটওয়ারী',
            name_en: 'Sohag Patwari',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'সহকারি কোষাধ্যক্ষ (অতিরিক্ত দ্বায়িত্ব)',
            image_url: 'https://i.imghippo.com/files/Ryb2861Bbo.jpg',
            year: 2025,
            display_order: 13,
            is_active: true
        },
        {
            name: 'আতাউল ইসলাম সাকিব',
            name_en: 'Ataul Islam Sakib',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'সহকারি কোষাধ্যক্ষ (অতিরিক্ত দ্বায়িত্ব)',
            image_url: 'https://i.imghippo.com/files/MaFI3982lM.jpg',
            year: 2025,
            display_order: 14,
            is_active: true
        },
        {
            name: 'Asif Iqbal',
            name_en: 'Asif Iqbal',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/Eey2067zFM.png',
            year: 2025,
            display_order: 15,
            is_active: true
        },
        {
            name: 'মো: মিরাজ',
            name_en: 'Md. Miraj',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/zH2674RiE.jpeg',
            year: 2025,
            display_order: 16,
            is_active: true
        },
        {
            name: 'মেহেদী হাসান',
            name_en: 'Mehedi Hasan',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/syC4852obs.jpg',
            year: 2025,
            display_order: 17,
            is_active: true
        },
        {
            name: 'মাহমুদুল হাসান',
            name_en: 'Mahmudal Hasan',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/hcx5520IA.jpeg',
            year: 2025,
            display_order: 18,
            is_active: true
        },
        {
            name: 'রায়হান মাহমুদ',
            name_en: 'Rayhan Mahmud',
            role: 'সদস্য',
            position: 'সদস্য',
            institution: 'স্বপ্নের ফরিদগঞ্জ',
            image_url: 'https://i.imghippo.com/files/PFCU4068tqE.jpeg',
            year: 2025,
            display_order: 19,
            is_active: true
        }
    ];

    try {
        for (const member of committeeMembers) {
            await query(
                `INSERT INTO committee_members (name, name_en, role, position, institution, image_url, year, display_order, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    member.name,
                    member.name_en,
                    member.role,
                    member.position,
                    member.institution,
                    member.image_url,
                    member.year,
                    member.display_order,
                    member.is_active
                ]
            );
        }

        console.log('✅ REAL Committee members seeded successfully!');
        console.log(`📊 Total members added: ${committeeMembers.length}`);
        console.log('👥 Leadership: 3 members');
        console.log('👥 Other members: 16 members');
    } catch (error) {
        console.error('❌ Error seeding committee members:', error);
        throw error;
    }
}

async function down() {
    console.log('🗑️  Removing seeded committee members...');

    try {
        await query('DELETE FROM committee_members WHERE year = 2025');
        console.log('✅ Seeded committee members removed successfully!');
    } catch (error) {
        console.error('❌ Error removing committee members:', error);
        throw error;
    }
}

module.exports = { up, down };
