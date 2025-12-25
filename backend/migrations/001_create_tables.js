const { pool } = require('../config/database');

const createTables = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        console.log('Creating database tables...');

        // Hero Images Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS hero_images (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        cloudinary_id TEXT,
        alt_text VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Statistics Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS statistics (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        value VARCHAR(50) NOT NULL,
        icon VARCHAR(50),
        color VARCHAR(50),
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Advisors Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS advisors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        role VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        institution VARCHAR(255),
        image_url TEXT,
        cloudinary_id TEXT,
        is_chief BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Committee Members Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS committee_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        role VARCHAR(255) NOT NULL,
        position VARCHAR(255),
        institution VARCHAR(255),
        image_url TEXT,
        cloudinary_id TEXT,
        year INTEGER NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Gallery Categories Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        description TEXT,
        year INTEGER NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Gallery Images Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES gallery_categories(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        cloudinary_id TEXT,
        alt_text VARCHAR(255),
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Activities Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_en VARCHAR(255),
        description TEXT,
        icon VARCHAR(100),
        color VARCHAR(50),
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Sponsors Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS sponsors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo_url TEXT,
        cloudinary_id TEXT,
        website_url TEXT,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Blood Donors Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS blood_donors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        blood_group VARCHAR(10) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        district VARCHAR(100) NOT NULL,
        upazila VARCHAR(100) NOT NULL,
        facebook_url TEXT,
        last_donation_date DATE,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Info Desk - Schools Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        type VARCHAR(100),
        eiin VARCHAR(50),
        address TEXT,
        phone VARCHAR(20),
        email VARCHAR(255),
        website TEXT,
        established_year INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Info Desk - Madrasas Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS madrasas (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        type VARCHAR(100),
        eiin VARCHAR(50),
        address TEXT,
        phone VARCHAR(20),
        email VARCHAR(255),
        established_year INTEGER,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Info Desk - Markets Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS markets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_en VARCHAR(255),
        location TEXT,
        market_days TEXT[],
        type VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Info Desk - Upazila Data Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS upazila_data (
        id SERIAL PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        value TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create indexes for better performance
        await client.query(`
      CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category_id);
      CREATE INDEX IF NOT EXISTS idx_blood_donors_blood_group ON blood_donors(blood_group);
      CREATE INDEX IF NOT EXISTS idx_blood_donors_district ON blood_donors(district);
      CREATE INDEX IF NOT EXISTS idx_blood_donors_upazila ON blood_donors(upazila);
      CREATE INDEX IF NOT EXISTS idx_committee_members_year ON committee_members(year);
      CREATE INDEX IF NOT EXISTS idx_gallery_categories_year ON gallery_categories(year);
    `);

        await client.query('COMMIT');
        console.log('✅ All tables created successfully!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error creating tables:', error);
        throw error;
    } finally {
        client.release();
    }
};

// Run migration
if (require.main === module) {
    createTables()
        .then(() => {
            console.log('Migration completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

module.exports = { createTables };
