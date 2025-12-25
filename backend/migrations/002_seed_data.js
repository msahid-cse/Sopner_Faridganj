const { query } = require('../config/database');

// Seed data from the current static website
const seedData = async () => {
    console.log('🌱 Starting database seeding...');

    try {
        // Seed Hero Images
        console.log('📸 Seeding hero images...');
        const heroImages = [
            { url: 'https://i.imghippo.com/files/XHdS8392vg.jpg', alt: 'Hero Image 1', order: 1 },
            { url: 'https://i.imghippo.com/files/ejNl9303Fxk.jpg', alt: 'Hero Image 2', order: 2 },
            { url: 'https://i.imghippo.com/files/cTx2834GKE.jpg', alt: 'Hero Image 3', order: 3 },
            { url: 'https://i.imghippo.com/files/xbQg9790JXE.jpg', alt: 'Hero Image 4', order: 4 },
            { url: 'https://i.imghippo.com/files/uyVA9986MN.jpg', alt: 'Hero Image 5', order: 5 }
        ];

        for (const img of heroImages) {
            await query(
                'INSERT INTO hero_images (image_url, alt_text, display_order) VALUES ($1, $2, $3)',
                [img.url, img.alt, img.order]
            );
        }

        // Seed Statistics
        console.log('📊 Seeding statistics...');
        const stats = [
            { title: 'শিক্ষার্থী সহায়তা', value: '৫০+', color: 'emerald', order: 1 },
            { title: 'সেমিনার', value: '১০+', color: 'blue', order: 2 },
            { title: 'বই বিতরণ', value: '১০০+', color: 'purple', order: 3 },
            { title: 'ত্রাণ বিতরণ', value: '৫০+', color: 'amber', order: 4 }
        ];

        for (const stat of stats) {
            await query(
                'INSERT INTO statistics (title, value, color, display_order) VALUES ($1, $2, $3, $4)',
                [stat.title, stat.value, stat.color, stat.order]
            );
        }

        // Seed Advisors
        console.log('👥 Seeding advisors...');
        const advisors = [
            {
                name: 'মোবারক করিম খান',
                role: 'প্রধান উপদেষ্টা',
                position: 'প্রভাষক, ICT',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/gV6278qPU.jpg',
                is_chief: true,
                order: 1
            },
            {
                name: 'নাসির উদ্দিন মিঠু',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/jqT7324VY.jpg',
                is_chief: false,
                order: 2
            },
            {
                name: 'মাহাবুব খান',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক',
                institution: 'লাউতলী ডাঃ রশীদ আহমেদ উচ্চ বিদ্যালয় ও কলেজ',
                image: 'https://i.imghippo.com/files/ood2481d.jpg',
                is_chief: false,
                order: 3
            },
            {
                name: 'বেলায়েত হোসেন',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক, গণিত',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/wf1462TY.jpeg',
                is_chief: false,
                order: 4
            },
            {
                name: 'নিজুম সাহা',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক, রসায়ন',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/oQ5454xzc.jpeg',
                is_chief: false,
                order: 5
            },
            {
                name: 'মো:জসীম উদ্দিন',
                role: 'উপদেষ্টা',
                position: 'সহকারী অধ্যাপক',
                institution: 'চান্দ্রা ইমাম আলী উচ্চ বিদ্যালয় ও কলেজ',
                image: 'https://i.imghippo.com/files/agIw7347qU.jpeg',
                is_chief: false,
                order: 6
            },
            {
                name: 'মহিবুর রহমান ভুঁইয়া',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক',
                institution: 'গৃদকালিন্দিয়া হাজেরা হাসমত ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/SBYv2678cw.jpeg',
                is_chief: false,
                order: 7
            },
            {
                name: 'শাহীনা আক্তার',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক, ভূগোল',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/Xiw2109Y.jpeg',
                is_chief: false,
                order: 8
            },
            {
                name: 'মো: জাহাঙ্গীর আলম',
                role: 'উপদেষ্টা',
                position: 'সহকারী অধ্যাপক',
                institution: 'কালির বাজার কলেজ',
                image: 'https://i.imghippo.com/files/uTQ3862QPQ.jpeg',
                is_chief: false,
                order: 9
            },
            {
                name: 'মো: জহিরুল ইসলাম খান',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক, হিসাব বিজ্ঞান',
                institution: 'গৃদকালিন্দিয়া হাজেরা হাসমত ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/SkZz5246L.jpg',
                is_chief: false,
                order: 10
            },
            {
                name: 'কাউছার হোসেন',
                role: 'উপদেষ্টা',
                position: 'প্রধান হিসাব সহকারী',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/mUWg2099jo.jpg',
                is_chief: false,
                order: 11
            },
            {
                name: 'সামিয়া আফরোজ',
                role: 'উপদেষ্টা',
                position: 'প্রভাষক, সমাজকর্ম',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/ckA8494gwk.jpg',
                is_chief: false,
                order: 12
            },
            {
                name: 'মো আজিজুর রহমান',
                role: 'উপদেষ্টা',
                position: 'অফিস সহকারী, কাম কম্পিউটার অপারেটর',
                institution: 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ',
                image: 'https://i.imghippo.com/files/xxNK1212lrA.jpeg',
                is_chief: false,
                order: 13
            }
        ];

        for (const advisor of advisors) {
            await query(
                'INSERT INTO advisors (name, role, position, institution, image_url, is_chief, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [advisor.name, advisor.role, advisor.position, advisor.institution, advisor.image, advisor.is_chief, advisor.order]
            );
        }

        // Seed Gallery Categories for 2025
        console.log('🖼️ Seeding gallery categories...');
        const galleryCategories = [
            { name: 'শিক্ষা সহায়তা', slug: 'education', description: 'আমাদের শিক্ষা সহায়তা কর্মসূচি গরীব এবং মেধাবী শিক্ষার্থীদের তাদের স্বপ্ন পূরণে সাহায্য করে।', year: 2025, order: 1 },
            { name: 'অর্জন', slug: 'award-2025', description: 'শ্রেষ্ট সামাজিক সংগঠন সম্মাননা অর্জন আমাদের জন্য একটি গর্বের বিষয়।', year: 2025, order: 2 },
            { name: 'বৃত্তি পরিক্ষা কর্মসূচি', slug: 'bitti_2025', description: 'বৃত্তি ফর্ম বিতরণ ও সংগ্রহ কার্যক্রমের কিছু মুহূর্ত।', year: 2025, order: 3 },
            { name: 'সেমিনার', slug: 'seminar-lawtoli', description: 'লাউতলী ডাঃ রশীদ আহমেদ উচ্চ বিদ্যালয়ে সেমিনার কার্যক্রমের কিছু ছবি।', year: 2025, order: 4 },
            { name: 'বৃত্তি পরীক্ষা -2025', slug: 'scholarship_exam_2025', description: 'বৃত্তি পরীক্ষা -2025 এর কিছু বিশেষ মুহূর্ত।', year: 2025, order: 5 },
            { name: 'বৃত্তি পরীক্ষা-2025 News', slug: 'scholarship_exam_2025_news', description: 'বৃত্তি পরীক্ষা -2025 সম্পৰ্কীত নিউজ কাটিং ও অন্যান্য খবর।', year: 2025, order: 6 }
        ];

        for (const category of galleryCategories) {
            await query(
                'INSERT INTO gallery_categories (name, slug, description, year, display_order) VALUES ($1, $2, $3, $4, $5)',
                [category.name, category.slug, category.description, category.year, category.order]
            );
        }

        // Seed some gallery images
        console.log('🖼️ Seeding gallery images...');
        const educationImages = [
            'https://i.imghippo.com/files/kHx7730Ro.jpg',
            'https://i.imghippo.com/files/tun7417is.jpg',
            'https://i.imghippo.com/files/dkmy5149JQ.jpg',
            'https://i.imghippo.com/files/kP2578TAs.jpg'
        ];

        const categoryResult = await query('SELECT id FROM gallery_categories WHERE slug = $1', ['education']);
        if (categoryResult.rows.length > 0) {
            const categoryId = categoryResult.rows[0].id;
            for (let i = 0; i < educationImages.length; i++) {
                await query(
                    'INSERT INTO gallery_images (category_id, image_url, alt_text, display_order) VALUES ($1, $2, $3, $4)',
                    [categoryId, educationImages[i], `শিক্ষা সহায়তা ${i + 1}`, i + 1]
                );
            }
        }

        // Seed Activities
        console.log('🎯 Seeding activities...');
        const activities = [
            { title: 'শিক্ষা সহায়তা', icon: '📚', color: 'blue', order: 1 },
            { title: 'স্বাস্থ্যসেবা', icon: '🏥', color: 'red', order: 2 },
            { title: 'পরিবেশ সংরক্ষণ', icon: '🌳', color: 'green', order: 3 },
            { title: 'ত্রাণ কার্যক্রম', icon: '🤝', color: 'purple', order: 4 }
        ];

        for (const activity of activities) {
            await query(
                'INSERT INTO activities (title, icon, color, display_order) VALUES ($1, $2, $3, $4)',
                [activity.title, activity.icon, activity.color, activity.order]
            );
        }

        console.log('✅ Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log(`   - ${heroImages.length} hero images`);
        console.log(`   - ${stats.length} statistics`);
        console.log(`   - ${advisors.length} advisors`);
        console.log(`   - ${galleryCategories.length} gallery categories`);
        console.log(`   - ${educationImages.length} gallery images`);
        console.log(`   - ${activities.length} activities`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

// Run seeder
if (require.main === module) {
    seedData()
        .then(() => {
            console.log('Seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedData };
