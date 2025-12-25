// Run migration to seed committee members
require('dotenv').config();
const migration = require('./migrations/004_seed_committee_members');

async function runMigration() {
    try {
        console.log('🚀 Starting committee members migration...\n');
        await migration.up();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
