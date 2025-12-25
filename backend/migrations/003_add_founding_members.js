const { query } = require('../config/database');

async function addFoundingMembersTable() {
    console.log('🔧 Adding founding_members table...');

    try {
        // Create founding_members table
        await query(`
            CREATE TABLE IF NOT EXISTS founding_members (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                name_en VARCHAR(255),
                role VARCHAR(255),
                position VARCHAR(255),
                institution VARCHAR(255),
                image_url TEXT,
                cloudinary_id TEXT,
                bio TEXT,
                display_order INTEGER DEFAULT 0,
                is_active BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `, []);

        console.log('✅ founding_members table created');

        // Seed some initial data
        const foundingMembers = [
            {
                name: 'প্রতিষ্ঠাতা সদস্য ১',
                name_en: 'Founding Member 1',
                role: 'প্রতিষ্ঠাতা সদস্য',
                position: 'সভাপতি',
                institution: 'স্বপ্নের ফরিদগঞ্জ',
                image_url: 'https://via.placeholder.com/150',
                order: 1
            },
            {
                name: 'প্রতিষ্ঠাতা সদস্য ২',
                name_en: 'Founding Member 2',
                role: 'প্রতিষ্ঠাতা সদস্য',
                position: 'সাধারণ সম্পাদক',
                institution: 'স্বপ্নের ফরিদগঞ্জ',
                image_url: 'https://via.placeholder.com/150',
                order: 2
            }
        ];

        for (const member of foundingMembers) {
            await query(
                `INSERT INTO founding_members (name, name_en, role, position, institution, image_url, display_order) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [member.name, member.name_en, member.role, member.position, member.institution, member.image_url, member.order]
            );
        }

        console.log('✅ Founding members data seeded');
        console.log('✅ Migration completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}

// Run migration
if (require.main === module) {
    addFoundingMembersTable()
        .then(() => {
            console.log('Done');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Failed:', error);
            process.exit(1);
        });
}

module.exports = { addFoundingMembersTable };
