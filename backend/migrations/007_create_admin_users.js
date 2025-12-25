// Migration: Create Admin Users Table
const { query } = require('../config/database');
const bcrypt = require('bcrypt');

async function up() {
    console.log('👤 Creating admin_users table...');

    // Create table
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS admin_users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            role VARCHAR(20) DEFAULT 'admin',
            is_active BOOLEAN DEFAULT true,
            last_login TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_username ON admin_users(username);
        CREATE INDEX IF NOT EXISTS idx_is_active ON admin_users(is_active);
    `;

    await query(createTableSQL);
    console.log('✅ Table created successfully!\n');

    // Create 5 admin users
    console.log('👥 Creating admin users...');

    const admins = [
        {
            username: 'admin',
            password: 'sopner2024',
            full_name: 'Super Admin',
            email: 'admin@sopner-faridganj.org',
            role: 'super_admin'
        },
        {
            username: 'mehedi',
            password: 'mehedi@2024',
            full_name: 'Mehedi Ashraf Limon',
            email: 'mehedi@sopner-faridganj.org',
            role: 'admin'
        },
        {
            username: 'nazim',
            password: 'nazim@2024',
            full_name: 'Nazim Uddin',
            email: 'nazim@sopner-faridganj.org',
            role: 'admin'
        },
        {
            username: 'joynal',
            password: 'joynal@2024',
            full_name: 'Joynal Abedin',
            email: 'joynal@sopner-faridganj.org',
            role: 'admin'
        },
        {
            username: 'abdullah',
            password: 'abdullah@2024',
            full_name: 'Md. Abdullah',
            email: 'abdullah@sopner-faridganj.org',
            role: 'admin'
        }
    ];

    for (const admin of admins) {
        const passwordHash = await bcrypt.hash(admin.password, 10);

        await query(
            `INSERT INTO admin_users (username, password_hash, full_name, email, role, is_active)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (username) DO UPDATE 
             SET password_hash = EXCLUDED.password_hash,
                 full_name = EXCLUDED.full_name,
                 email = EXCLUDED.email,
                 role = EXCLUDED.role`,
            [admin.username, passwordHash, admin.full_name, admin.email, admin.role, true]
        );

        console.log(`✅ Created: ${admin.username} (${admin.full_name})`);
    }

    console.log('\n📋 Admin Credentials:');
    console.log('─────────────────────────────────────');
    admins.forEach(admin => {
        console.log(`Username: ${admin.username.padEnd(12)} | Password: ${admin.password}`);
    });
    console.log('─────────────────────────────────────\n');

    console.log('✅ Admin users created successfully!');
}

async function down() {
    console.log('🗑️  Dropping admin_users table...');

    try {
        await query('DROP TABLE IF EXISTS admin_users CASCADE');
        console.log('✅ Admin users table dropped successfully!');
    } catch (error) {
        console.error('❌ Error dropping admin_users table:', error);
        throw error;
    }
}

module.exports = { up, down };
