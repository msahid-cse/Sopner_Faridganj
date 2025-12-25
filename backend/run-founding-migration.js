// Run migration to seed founding members
require('dotenv').config();
const migration = require('./migrations/005_seed_founding_members');

async function runMigration() {
    try {
        console.log('🚀 Starting founding members migration...\n');
        await migration.up();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
