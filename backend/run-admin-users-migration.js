// Run migration to create admin users
require('dotenv').config();
const migration = require('./migrations/007_create_admin_users');

async function runMigration() {
    try {
        console.log('🚀 Starting admin users migration...\n');
        await migration.up();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
